/* NetNote Group Insights — permanent posts.
   Add posts to this array to publish them for every visitor.
   Tip: use "Export posts" on blog.html to generate this file from posts you wrote in the editor.
   type: "blog" | "vlog"   category: "systems" | "aero" | "security" | "general"
   video: a YouTube link (vlogs only). body: paragraphs separated by a blank line (\n\n). */
window.NN_POSTS = [
  {
    id: 'seed-backups', type: 'blog', category: 'security', date: '2026-11-10', author: 'NetNote Security',
    title: 'The 3-2-1 backup rule, explained simply',
    summary: 'Three copies, two kinds of storage, one stored off-site. Here is why it still works.',
    body: 'Most data loss is not dramatic. It is a stolen laptop, a failed drive, or one wrong click on ransomware.\n\nThe 3-2-1 rule keeps three copies of your data, on two different types of storage, with one copy stored away from your office. If any one thing fails, you still have another way back.\n\nThe step people skip is testing. A backup you have never restored is only a hope. Schedule a restore test every quarter and write down how long it took.'
  },
  {
    id: 'seed-phishing', type: 'blog', category: 'security', date: '2026-11-03', author: 'NetNote Security',
    title: 'Five signs an email is phishing',
    summary: 'Urgent tone, odd sender, unexpected attachment: learn the quick checks that stop most attacks.',
    body: 'Attackers rely on speed. They want you to click before you think.\n\nCheck the sender address, not just the display name. Hover over links to see where they really go. Be wary of unexpected attachments and of any message that creates urgency around money or passwords.\n\nWhen in doubt, contact the sender using a number or channel you already trust, never the one in the message.'
  },
  {
    id: 'seed-drones', type: 'blog', category: 'aero', date: '2026-10-27', author: 'NetNote Aero',
    title: 'What a drone survey can do that a tape measure cannot',
    summary: 'Aerial mapping saves days of fieldwork and gives you a record you can revisit.',
    body: 'A drone can cover in minutes what takes a ground team days: roofs, farmland, construction sites and utility lines.\n\nOverlapping photos are stitched into a map and a 3D model, so you can measure distances and volumes from your desk. Because the data is dated, you can compare progress week by week.\n\nAlways check local aviation rules before flying. In Kenya, drone operations are regulated by the Kenya Civil Aviation Authority.'
  },
  {
    id: 'seed-erp', type: 'blog', category: 'systems', date: '2026-10-20', author: 'NetNote Systems',
    title: 'Is your business ready for an ERP?',
    summary: 'Signs that spreadsheets have stopped scaling, and what to plan before you switch.',
    body: 'If your team re-enters the same data in three places, or month-end takes a week, you have outgrown spreadsheets.\n\nAn ERP joins sales, stock, finance and HR in one system. The software matters less than the groundwork: map your current process, decide who owns the data, and train people before go-live.\n\nStart small with the one process that hurts most, then add modules.'
  },
  {
    id: 'seed-vlog', type: 'vlog', category: 'general', date: '2026-10-15', author: 'NetNote Group', video: '',
    title: 'Welcome to NetNote Group Insights (vlog)',
    summary: 'Our first video: what we cover and how to follow tech updates from NetNote Group.',
    body: 'This is a sample vlog entry. Open the Insights page (blog.html), choose "Write a post", pick Vlog and paste a YouTube link to publish yours.'
  }
];
