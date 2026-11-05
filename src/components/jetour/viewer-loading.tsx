"use client";

export function ViewerLoading({ percent, error = false, onRetry }: { percent: number; error?: boolean; onRetry: () => void }) {
  return <div className="viewer-loading">
    {error ? <div className="viewer-loading__error" role="alert"><p>Зураг ачаалж чадсангүй.</p><button type="button" onClick={onRetry}>Дахин оролдох</button></div>
      : <div className="viewer-loading__percent" role="progressbar" aria-label="Зураг ачаалж байна" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.min(100, Math.max(1, percent))}>{Math.min(100, Math.max(1, percent))}%</div>}
  </div>;
}
