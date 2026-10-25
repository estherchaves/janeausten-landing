import { m, useReducedMotion } from 'framer-motion'

const variants = {
  up: { hidden: { opacity: 0, y: 28 }, shown: { opacity: 1, y: 0 } },
  fade: { hidden: { opacity: 0 }, shown: { opacity: 1 } },
  // Curtain: content is uncovered from the bottom edge, like a lifted veil
  curtain: {
    hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
    shown: { clipPath: 'inset(0% 0% 0% 0%)' },
  },
}

/**
 * Reveals its children once when they enter the viewport.
 * With prefers-reduced-motion the content renders immediately, unanimated.
 */
export default function AnimatedReveal({
  as = 'div',
  variant = 'up',
  delay = 0,
  duration = 0.9,
  amount = 0.15,
  className,
  children,
  ...rest
}) {
  const reduce = useReducedMotion()
  const Component = m[as] ?? m.div

  if (reduce) {
    const Tag = as
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    )
  }

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount }}
      variants={variants[variant]}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Component>
  )
}
