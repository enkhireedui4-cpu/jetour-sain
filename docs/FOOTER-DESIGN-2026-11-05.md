# Jetour Global-inspired update

The earlier dark redesign below was superseded at the user's request. The live Jetour Global footer DOM was inspected with reverse-engineer-anything (desktop evidence ev_fbda8e4c95ff4b1bf8d11a87f34508c721f9905958bcce707bcd4084c1c0f86f; mobile evidence ev_c79b5341b50cc21ea99faa37125a0c903e2b1d0d2573415a11f90aafa983a4fe). Its light background, spaced desktop navigation columns, social links and mobile accordion groups informed this version. The local navigation, contact details and legal links remain intact. The reference footer was assessed from the captured DOM; its screenshot was obscured by the cookie overlay.

Verification: local component previews passed nine widths from 320px to 1920px, with no horizontal overflow, retained links and working mobile model accordion. The preview uses placeholder social icons; the actual component uses its existing Lucide icons.

---

# Footer redesign

Brief: the compact footer was rejected as crowded and too small. Preserve the site's automotive brand and practical contact/navigation content while making it readable and balanced.

Direction:
- Existing Inter typography; 15–16px primary footer copy, 14px supporting text, 28px telephone number. Normal-weight addresses and links; semibold section headings.
- Graphite #17181B, white #F7F8FA, secondary #B9BDC5, supporting #9298A3, divider #34373D. Existing Jetour red #E20A17 is interaction feedback only.
- Masthead: official Jetour mark at left, showroom hours in the middle, a prominent telephone link at right. Five content groups beneath; the contact column stays wider. Model links use a two-column list where space permits. Social controls and legal information occupy a distinct bottom row.
- Contact labels sit above their values, eliminating narrow table-like label columns. Addresses and email remain complete. Touch links retain usable target areas and visible focus.
- Mobile: logo/telephone masthead, a full-width hours row, a two-column address block and two-column navigation groups, followed by social/legal rows. No new animations or dependencies.

Review against the brief: simply enlarging the previous table would retain its cramped hierarchy. The new masthead removes phone/hours from the long first column, and the split model list balances the other navigation groups. The decorative background grid is removed so spacing and typography carry the hierarchy.

Skills applied: frontend-design (subject-specific hierarchy, typography, restraint, screenshot critique) and ui-ux-pro-max (existing-UI review guidance on whitespace, line height, contrast, targets and responsive wrapping). Python CLI is unavailable in this environment; its Quick Reference and local UX data are used directly for this existing-component review.

Verification: the actual Inter font and production global stylesheet were used in a local component preview. Nine widths from 320 to 1920px passed: no horizontal overflow, no text extending beyond its column, all existing link destinations retained, 15.5/16px primary text, and visible keyboard focus. At 1440px the footer is about 532px tall (previous rejected version 364px; original version about 648px). The increased height is intentional to restore readable typography and distinct groups. Social icons in the fixture are placeholders; deployed verification uses the unchanged Lucide icons.
