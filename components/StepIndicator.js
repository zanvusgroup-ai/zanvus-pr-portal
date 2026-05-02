export default function StepIndicator({ current }) {
  const steps = ['Story', 'Article', 'Publish']

  return (
    <div className="flex items-center justify-center gap-3 mb-12">
      {steps.map((step, i) => {
        const num = i + 1
        let cls = 'step-pending'
        if (num < current) cls = 'step-done'
        if (num === current) cls = 'step-active'

        return (
          <div key={step} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${cls}`}>
                {num < current ? '✓' : num}
              </div>
              <span className={`text-xs tracking-wider hidden md:block ${num === current ? 'text-gold-400' : 'text-white/30'}`}>
                {step.toUpperCase()}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="w-8 md:w-16 h-px bg-white/10" />
            )}
          </div>
        )
      })}
    </div>
  )
}
