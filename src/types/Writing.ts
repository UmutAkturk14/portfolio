export interface Writing {
  title: string;
  description: string;
  date: string;          // e.g. "May 2025"
  link: string;          // full URL or internal route
  tags: string[];        // ["Tech", "Personal", …]
  coverImage: string;    // URL to hero/thumbnail
  themeColor: string;    // hex for card accent
}
