# Hub Lead API — JETOUR сайт → CRM/Hub интеграц

Энэ баримт нь JETOUR сайт лийд (хүсэлт)-ийг гадаад hub/CRM руу **яаж
дамжуулдаг**, hub тал түүнийг **яаж хүлээж авах** гэрээг (contract) тодорхойлно.

Эх сурвалж (сайтын код):
- `src/app/api/lead/route.ts` → `sendToHub()`
- `src/lib/leads.ts` → `leadSchema`

---

## 1. Дамжуулах гэрээ (contract)

Сайт бүх лийдийг НЭГ дотоод endpoint (`/api/lead`)-ээр хүлээж аваад,
өөрийн DB-д хадгалж, зэрэгцээ hub руу дараах хүсэлтээр илгээнэ:

```
POST  <HUB_LEAD_URL>
Content-Type:  application/json
Authorization: Token <HUB_LEAD_TOKEN>      # Django REST Framework TokenAuth хэлбэр
Timeout:       8 секунд
Body:          доорх JSON
```

Зан төлөв:
- `HUB_LEAD_URL` ба `HUB_LEAD_TOKEN` хоёуланг тохируулаагүй бол сайт hub руу
  **огт явуулахгүй, чимээгүй өнгөрнө** (код өөрчлөх шаардлагагүй).
- Сайт зөвхөн **HTTP статус 2xx** эсэхийг шалгана (хариуны body уншдаггүй).
  Hub `200`/`201` буцаахад хангалттай.
- Hub унасан ч лийд сайтын ӨӨРИЙН DB-д хадгалагдана — **өгөгдөл алдагдахгүй**.

---

## 2. JSON body — талбарууд (яг энэ нэрсээр, camelCase)

| Талбар | Төрөл | Заавал | Тайлбар / жишээ |
|--------|-------|:---:|---|
| `type` | string | ✔ | `test-drive` · `info-request` · `financing` · `service` · `parts` · `general` |
| `name` | string | ✔ | Нэр |
| `phone` | string | ✔ | 7–12 орон (`"88112233"`) |
| `email` | string | – | и-мэйл эсвэл `""` |
| `model` | string | – | `"JETOUR T2"` |
| `branch` | string | – | Салбарын нэр |
| `date` | string | – | `"2026-09-05"` |
| `time` | string | – | `"Өглөө (09:00–12:00)"` |
| `contactMethod` | string | – | `call` · `messenger` · `whatsapp` |
| `message` | string | – | Нэмэлт зурвас |
| `vehiclePrice` | number | – | Санхүүжилтийн тооцоо |
| `downPayment` | number | – | ↑ |
| `termMonths` | number | – | ↑ |
| `interestRate` | number | – | ↑ |
| `monthlyPayment` | number | – | ↑ |
| `createdAt` | string (ISO) | ✔ | Сайт нэмдэг: `"2026-09-01T07:12:00.000Z"` |

### Жишээ payload
```json
{
  "type": "test-drive",
  "name": "Болд",
  "phone": "88112233",
  "model": "JETOUR T2",
  "message": "",
  "createdAt": "2026-09-01T07:12:00.000Z"
}
```

---

## 3. Vercel env (сайтын тал)

Vercel → төсөл → **Settings → Environment Variables**:

```
HUB_LEAD_URL   = https://<таны-hub>/api/leads/
HUB_LEAD_TOKEN = <DRF token>
```

→ дараа нь **Redeploy**.

---

## 4. Hub тал — хүлээн авах endpoint (Django REST Framework)

Auth нь `Token …` хэлбэртэй тул DRF-ийн `TokenAuthentication`-д яг тохирно.

### `models.py`
```python
from django.db import models

class Lead(models.Model):
    type = models.CharField(max_length=32, default="general")
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=32)
    email = models.EmailField(blank=True, null=True)
    model = models.CharField(max_length=255, blank=True, null=True)
    branch = models.CharField(max_length=255, blank=True, null=True)
    date = models.CharField(max_length=64, blank=True, null=True)
    time = models.CharField(max_length=64, blank=True, null=True)
    contact_method = models.CharField(max_length=32, blank=True, null=True)
    message = models.TextField(blank=True, null=True)
    vehicle_price = models.FloatField(blank=True, null=True)
    down_payment = models.FloatField(blank=True, null=True)
    term_months = models.IntegerField(blank=True, null=True)
    interest_rate = models.FloatField(blank=True, null=True)
    monthly_payment = models.FloatField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)   # сайтаас ирсэн createdAt
    received_at = models.DateTimeField(auto_now_add=True)      # hub хүлээн авсан цаг
```

### `serializers.py` — талбарын нэрс сайтын camelCase-тэй ЯГ таарна
```python
from rest_framework import serializers

class LeadSerializer(serializers.Serializer):
    type = serializers.CharField(required=False, default="general")
    name = serializers.CharField()
    phone = serializers.CharField()
    email = serializers.EmailField(required=False, allow_blank=True, allow_null=True)
    model = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    branch = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    date = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    time = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    contactMethod = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    message = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    vehiclePrice = serializers.FloatField(required=False, allow_null=True)
    downPayment = serializers.FloatField(required=False, allow_null=True)
    termMonths = serializers.IntegerField(required=False, allow_null=True)
    interestRate = serializers.FloatField(required=False, allow_null=True)
    monthlyPayment = serializers.FloatField(required=False, allow_null=True)
    createdAt = serializers.DateTimeField(required=False, allow_null=True)
```

### `views.py`
```python
from rest_framework.decorators import (
    api_view, authentication_classes, permission_classes
)
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import LeadSerializer
from .models import Lead

@api_view(["POST"])
@authentication_classes([TokenAuthentication])   # Authorization: Token <key>
@permission_classes([IsAuthenticated])
def receive_lead(request):
    s = LeadSerializer(data=request.data)
    s.is_valid(raise_exception=True)
    d = s.validated_data
    Lead.objects.create(
        type=d.get("type", "general"),
        name=d["name"], phone=d["phone"],
        email=d.get("email"), model=d.get("model"), branch=d.get("branch"),
        date=d.get("date"), time=d.get("time"),
        contact_method=d.get("contactMethod"), message=d.get("message"),
        vehicle_price=d.get("vehiclePrice"), down_payment=d.get("downPayment"),
        term_months=d.get("termMonths"), interest_rate=d.get("interestRate"),
        monthly_payment=d.get("monthlyPayment"), created_at=d.get("createdAt"),
    )
    return Response({"ok": True}, status=status.HTTP_201_CREATED)  # 2xx = амжилт
```

### `urls.py`
```python
from django.urls import path
from .views import receive_lead

urlpatterns = [
    path("api/leads/", receive_lead),   # ← HUB_LEAD_URL нь энэ зам
]
```

### Token үүсгэх (нэг удаа)
```bash
# settings.py → INSTALLED_APPS-д "rest_framework.authtoken" нэмнэ
python manage.py migrate
python manage.py drf_create_token <username>   # гарсан токен = HUB_LEAD_TOKEN
```

---

## 5. Тест (hub-аа шалгах)

```bash
curl -X POST https://<таны-hub>/api/leads/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Token <HUB_LEAD_TOKEN>" \
  -d '{"type":"test-drive","name":"Тест","phone":"88112233","model":"JETOUR T2","createdAt":"2026-09-01T07:12:00.000Z"}'
```

Хүлээгдэх хариу: `201` + `{"ok": true}`.

---

## 6. Тэмдэглэл

- **Django биш** бол ижил гэрээгээр (POST + `Authorization: Token …` + дээрх JSON
  + 2xx хариу) ямар ч framework дээр (Node/Express, PHP/Laravel, .NET) хийж болно.
  Токен шалгалт = `Authorization` header-ийн утгыг нууц токентой тулгах.
- Сайтын код өөрчлөх шаардлагагүй — Vercel дээр 2 env var + hub endpoint л
  хийхэд интеграц ажиллаж эхэлнэ.
- `type` талбар нь лийдийн эх сурвалжийг ялгана: тест драйв, мэдээлэл авах,
  санхүүжилт, засвар, сэлбэг, ерөнхий. Hub үүгээр ангилж болно.
