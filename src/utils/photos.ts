export function photoUrl(id: string, width = 800) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=75`
}

export const PHOTOS = {
  feast: 'photo-1526016650454-68a6f488910a',
  breakfast: 'photo-1614800443187-cc573044fa19',
  plate: 'photo-1542528180-0c79567c66de',
  table: 'photo-1633195000232-ca6e3cbcfd41',
  soup: 'photo-1530734575165-ce39d996fbaa',
  baklava: 'photo-1598110750624-207050c4f28c',
  salad: 'photo-1641898378768-9b40ddcf2815',
  eggplant: 'photo-1782878906030-a1c4b89aefab',
  pudding: 'photo-1606728099646-68d5a0a4d423',
}
