# Design System

BusinessHub uses a clean SaaS visual language: slate-based text and surfaces, the existing deep teal primary (`#103746`), rounded controls, subtle borders, and soft shadows. Tailwind is the implementation layer; avoid standalone CSS systems and inline style objects.

Build from UI primitives in `components/ui`: Button, Card, Badge, Input, Textarea, Select, Modal, ConfirmDialog, and Toast. Compose primitives in features instead of duplicating their foundations. Buttons must have a clear action, forms need labels and validation feedback, and icon-only controls require accessible names.

Toast notifications appear top-right, display at most five items, auto-dismiss after four seconds, and support manual dismissal. Use success, error, warning, and info variants deliberately. Layouts must work from mobile widths upward, with content that wraps rather than clips.
