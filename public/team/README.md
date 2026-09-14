# Founder headshots

Drop the files here, then set `photo` on the matching entry in
`src/routes/about.tsx`:

    public/team/murali-reddy.jpg    ->  photo: "/team/murali-reddy.jpg"
    public/team/sooryah-pokkali.jpg ->  photo: "/team/sooryah-pokkali.jpg"

Requirements:
  - Square crop, 400x400 minimum (rendered at 56px, so 2x covers retina).
  - JPEG or WebP, under ~200 KB each.
  - Must be a real photograph of that person. These are published as
    schema.org Person.image tied to a named individual, so a stock photo
    here is a misrepresentation of a real person, not a placeholder.

Until `photo` is set the page renders the person's initials and publishes no
image URL — deliberate, because a Person.image pointing at a 404 is worse for
search than having none.
