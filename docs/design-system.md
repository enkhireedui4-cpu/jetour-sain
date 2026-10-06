# UI conventions

Design tokens live in src/app/globals.css. Inter is used for body and display text. The primary accent is #E20A17, with #17181B headings, #54585F body text and #E7E7EA borders on white or pale grey surfaces.

Vehicle detail pages share one template and obtain content through src/lib/cms.ts. Reuse existing components and tokens for new sections. Use clear headings, visible focus states and labels for form controls. Vehicle imagery should keep its proportions and have an appropriate sizes value.

Keep motion limited to interactions and section transitions. Respect reduced-motion preferences. Public vehicle specifications and prices must come from approved content; missing values should remain absent until confirmed.
