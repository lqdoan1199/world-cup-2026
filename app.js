// ====================================================
// WORLD CUP 2026 BRACKET TRACKER & LIVE API LOGIC
// ====================================================

// --- 1. TEAMS DATABASE (32 Teams with codes, ratings, and squads) ---
const TEAMS = {
    de: { name: "Đức", code: "de", power: 91, squad: [
        { name: "M. ter Stegen", pos: "GK", num: 1 },
        { name: "J. Kimmich", pos: "DF", num: 6 },
        { name: "A. Rüdiger", pos: "DF", num: 2 },
        { name: "J. Tah", pos: "DF", num: 4 },
        { name: "M. Mittelstädt", pos: "DF", num: 3 },
        { name: "R. Andrich", pos: "MF", num: 23 },
        { name: "T. Kroos", pos: "MF", num: 8 },
        { name: "J. Musiala", pos: "MF", num: 10 },
        { name: "I. Gündoğan", pos: "MF", num: 21 },
        { name: "F. Wirtz", pos: "MF", num: 17 },
        { name: "K. Havertz", pos: "FW", num: 7 }
    ]},
    py: { name: "Paraguay", code: "py", power: 75, squad: [
        { name: "R. Fernández", pos: "GK", num: 1 },
        { name: "G. Gómez", pos: "DF", num: 15 },
        { name: "F. Balbuena", pos: "DF", num: 4 },
        { name: "O. Alderete", pos: "DF", num: 3 },
        { name: "M. Gamarra", pos: "DF", num: 2 },
        { name: "A. Cubas", pos: "MF", num: 14 },
        { name: "M. Villasanti", pos: "MF", num: 23 },
        { name: "D. Gómez", pos: "MF", num: 8 },
        { name: "M. Almirón", pos: "FW", num: 10 },
        { name: "J. Enciso", pos: "FW", num: 19 },
        { name: "A. Sanabria", pos: "FW", num: 9 }
    ]},
    fr: { name: "Pháp", code: "fr", power: 93, squad: [
        { name: "M. Maignan", pos: "GK", num: 16 },
        { name: "J. Koundé", pos: "DF", num: 5 },
        { name: "D. Upamecano", pos: "DF", num: 4 },
        { name: "W. Saliba", pos: "DF", num: 17 },
        { name: "T. Hernandez", pos: "DF", num: 22 },
        { name: "A. Tchouaméni", pos: "MF", num: 8 },
        { name: "N. Kanté", pos: "MF", num: 13 },
        { name: "A. Rabiot", pos: "MF", num: 14 },
        { name: "A. Griezmann", pos: "MF", num: 7 },
        { name: "O. Dembélé", pos: "FW", num: 11 },
        { name: "K. Mbappé", pos: "FW", num: 10 }
    ]},
    se: { name: "Thụy Điển", code: "se", power: 81, squad: [
        { name: "R. Olsen", pos: "GK", num: 1 },
        { name: "E. Krafth", pos: "DF", num: 2 },
        { name: "V. Lindelöf", pos: "DF", num: 3 },
        { name: "I. Hien", pos: "DF", num: 4 },
        { name: "L. Augustinsson", pos: "DF", num: 5 },
        { name: "J. Cajuste", pos: "MF", num: 8 },
        { name: "H. Larsson", pos: "MF", num: 18 },
        { name: "D. Kulusevski", pos: "MF", num: 21 },
        { name: "E. Forsberg", pos: "MF", num: 10 },
        { name: "A. Isak", pos: "FW", num: 9 },
        { name: "V. Gyökeres", pos: "FW", num: 17 }
    ]},
    za: { name: "Nam Phi", code: "za", power: 72, squad: [
        { name: "R. Williams", pos: "GK", num: 1 },
        { name: "K. Mudau", pos: "DF", num: 2 },
        { name: "M. Mvala", pos: "DF", num: 3 },
        { name: "G. Kekana", pos: "DF", num: 18 },
        { name: "A. Modiba", pos: "DF", num: 6 },
        { name: "T. Mokoena", pos: "MF", num: 4 },
        { name: "S. Sithole", pos: "MF", num: 13 },
        { name: "T. Zwane", pos: "MF", num: 11 },
        { name: "T. Morena", pos: "FW", num: 23 },
        { name: "P. Tau", pos: "FW", num: 10 },
        { name: "E. Makgopa", pos: "FW", num: 9 }
    ]},
    ca: { name: "Canada", code: "ca", power: 79, squad: [
        { name: "M. Crépeau", pos: "GK", num: 16 },
        { name: "A. Johnston", pos: "DF", num: 2 },
        { name: "M. Bombito", pos: "DF", num: 15 },
        { name: "D. Cornelius", pos: "DF", num: 13 },
        { name: "A. Davies", pos: "DF", num: 19 },
        { name: "S. Eustáquio", pos: "MF", num: 7 },
        { name: "I. Koné", pos: "MF", num: 8 },
        { name: "J. Shaffelburg", pos: "MF", num: 14 },
        { name: "J. David", pos: "FW", num: 10 },
        { name: "C. Larin", pos: "FW", num: 9 },
        { name: "T. Buchanan", pos: "FW", num: 11 }
    ]},
    nl: { name: "Hà Lan", code: "nl", power: 89, squad: [
        { name: "B. Verbruggen", pos: "GK", num: 1 },
        { name: "D. Dumfries", pos: "DF", num: 22 },
        { name: "S. de Vrij", pos: "DF", num: 6 },
        { name: "V. van Dijk", pos: "DF", num: 4 },
        { name: "N. Aké", pos: "DF", num: 5 },
        { name: "J. Schouten", pos: "MF", num: 24 },
        { name: "T. Reijnders", pos: "MF", num: 14 },
        { name: "X. Simons", pos: "MF", num: 7 },
        { name: "D. Malen", pos: "FW", num: 18 },
        { name: "M. Depay", pos: "FW", num: 10 },
        { name: "C. Gakpo", pos: "FW", num: 11 }
    ]},
    ma: { name: "Morocco", code: "ma", power: 85, squad: [
        { name: "Y. Bounou", pos: "GK", num: 1 },
        { name: "A. Hakimi", pos: "DF", num: 2 },
        { name: "N. Aguerd", pos: "DF", num: 5 },
        { name: "R. Saïss", pos: "DF", num: 6 },
        { name: "Y. Attiat-Allah", pos: "DF", num: 25 },
        { name: "S. Amrabat", pos: "MF", num: 4 },
        { name: "A. Ounahi", pos: "MF", num: 8 },
        { name: "B. El Khannouss", pos: "MF", num: 11 },
        { name: "H. Ziyech", pos: "FW", num: 7 },
        { name: "Y. En-Nesyri", pos: "FW", num: 19 },
        { name: "B. Díaz", pos: "FW", num: 10 }
    ]},
    pt: { name: "Bồ Đào Nha", code: "pt", power: 90, squad: [
        { name: "Diogo Costa", pos: "GK", num: 22 },
        { name: "João Cancelo", pos: "DF", num: 20 },
        { name: "Rúben Dias", pos: "DF", num: 4 },
        { name: "Pepe", pos: "DF", num: 3 },
        { name: "Nuno Mendes", pos: "DF", num: 19 },
        { name: "João Palhinha", pos: "MF", num: 6 },
        { name: "Vitinha", pos: "MF", num: 23 },
        { name: "Bruno Fernandes", pos: "MF", num: 8 },
        { name: "Bernardo Silva", pos: "FW", num: 10 },
        { name: "Cristiano Ronaldo", pos: "FW", num: 7 },
        { name: "Rafael Leão", pos: "FW", num: 17 }
    ]},
    hr: { name: "Croatia", code: "hr", power: 83, squad: [
        { name: "D. Livaković", pos: "GK", num: 1 },
        { name: "J. Stanišić", pos: "DF", num: 2 },
        { name: "J. Šutalo", pos: "DF", num: 6 },
        { name: "M. Pongračić", pos: "DF", num: 3 },
        { name: "J. Gvardiol", pos: "DF", num: 4 },
        { name: "M. Kovacić", pos: "MF", num: 8 },
        { name: "L. Modrić", pos: "MF", num: 10 },
        { name: "M. Pašalić", pos: "MF", num: 15 },
        { name: "L. Majer", pos: "MF", num: 7 },
        { name: "A. Kramarić", pos: "FW", num: 9 },
        { name: "I. Perišić", pos: "FW", num: 14 }
    ]},
    es: { name: "Tây Ban Nha", code: "es", power: 92, squad: [
        { name: "Unai Simón", pos: "GK", num: 23 },
        { name: "Dani Carvajal", pos: "DF", num: 2 },
        { name: "Robin Le Normand", pos: "DF", num: 3 },
        { name: "Aymeric Laporte", pos: "DF", num: 14 },
        { name: "Marc Cucurella", pos: "DF", num: 24 },
        { name: "Rodri", pos: "MF", num: 16 },
        { name: "Fabián Ruiz", pos: "MF", num: 8 },
        { name: "Dani Olmo", pos: "MF", num: 10 },
        { name: "Lamine Yamal", pos: "FW", num: 19 },
        { name: "Álvaro Morata", pos: "FW", num: 7 },
        { name: "Nico Williams", pos: "FW", num: 17 }
    ]},
    at: { name: "Áo", code: "at", power: 80, squad: [
        { name: "P. Pentz", pos: "GK", num: 13 },
        { name: "S. Posch", pos: "DF", num: 5 },
        { name: "K. Danso", pos: "DF", num: 4 },
        { name: "M. Wöber", pos: "DF", num: 2 },
        { name: "P. Mwene", pos: "DF", num: 16 },
        { name: "N. Seiwald", pos: "MF", num: 6 },
        { name: "F. Grillitsch", pos: "MF", num: 10 },
        { name: "K. Laimer", pos: "MF", num: 20 },
        { name: "C. Baumgartner", pos: "MF", num: 19 },
        { name: "M. Sabitzer", pos: "MF", num: 9 },
        { name: "M. Arnautović", pos: "FW", num: 7 }
    ]},
    us: { name: "Mỹ", code: "us", power: 82, squad: [
        { name: "M. Turner", pos: "GK", num: 1 },
        { name: "J. Scally", pos: "DF", num: 22 },
        { name: "C. Richards", pos: "DF", num: 3 },
        { name: "T. Ream", pos: "DF", num: 13 },
        { name: "A. Robinson", pos: "DF", num: 5 },
        { name: "W. McKennie", pos: "MF", num: 8 },
        { name: "T. Adams", pos: "MF", num: 4 },
        { name: "G. Reyna", pos: "MF", num: 7 },
        { name: "T. Weah", pos: "FW", num: 21 },
        { name: "F. Balogun", pos: "FW", num: 20 },
        { name: "C. Pulisic", pos: "FW", num: 10 }
    ]},
    ba: { name: "Bosnia & Herzegovina", code: "ba", power: 74, squad: [
        { name: "N. Vasilj", pos: "GK", num: 1 },
        { name: "A. Dedić", pos: "DF", num: 2 },
        { name: "N. Katić", pos: "DF", num: 16 },
        { name: "E. Bičakčić", pos: "DF", num: 3 },
        { name: "S. Kolašinac", pos: "DF", num: 5 },
        { name: "B. Tahirović", pos: "MF", num: 8 },
        { name: "H. Hajradinović", pos: "MF", num: 10 },
        { name: "A. Saric", pos: "MF", num: 14 },
        { name: "E. Demirović", pos: "FW", num: 23 },
        { name: "E. Džeko", pos: "FW", num: 11 },
        { name: "H. Tabaković", pos: "FW", num: 9 }
    ]},
    be: { name: "Bỉ", code: "be", power: 86, squad: [
        { name: "K. Casteels", pos: "GK", num: 1 },
        { name: "T. Castagne", pos: "DF", num: 21 },
        { name: "W. Faes", pos: "DF", num: 4 },
        { name: "J. Vertonghen", pos: "DF", num: 5 },
        { name: "A. Theate", pos: "DF", num: 3 },
        { name: "O. Mangala", pos: "MF", num: 18 },
        { name: "A. Onana", pos: "MF", num: 24 },
        { name: "K. De Bruyne", pos: "MF", num: 7 },
        { name: "L. Trossard", pos: "FW", num: 9 },
        { name: "R. Lukaku", pos: "FW", num: 10 },
        { name: "J. Doku", pos: "FW", num: 22 }
    ]},
    sn: { name: "Senegal", code: "sn", power: 81, squad: [
        { name: "E. Mendy", pos: "GK", num: 16 },
        { name: "A. Seck", pos: "DF", num: 2 },
        { name: "K. Koulibaly", pos: "DF", num: 3 },
        { name: "A. Diallo", pos: "DF", num: 22 },
        { name: "I. Jakobs", pos: "DF", num: 14 },
        { name: "P. Sarr", pos: "MF", num: 17 },
        { name: "I. Gueye", pos: "MF", num: 5 },
        { name: "L. Camara", pos: "MF", num: 25 },
        { name: "I. Sarr", pos: "FW", num: 18 },
        { name: "N. Jackson", pos: "FW", num: 7 },
        { name: "Sadio Mané", pos: "FW", num: 10 }
    ]},
    br: { name: "Brazil", code: "br", power: 93, squad: [
        { name: "Alisson", pos: "GK", num: 1 },
        { name: "Danilo", pos: "DF", num: 2 },
        { name: "Marquinhos", pos: "DF", num: 3 },
        { name: "Gabriel Magalhães", pos: "DF", num: 4 },
        { name: "Wendell", pos: "DF", num: 6 },
        { name: "Bruno Guimarães", pos: "MF", num: 5 },
        { name: "João Gomes", pos: "MF", num: 15 },
        { name: "Lucas Paquetá", pos: "MF", num: 8 },
        { name: "Raphinha", pos: "FW", num: 11 },
        { name: "Rodrygo", pos: "FW", num: 10 },
        { name: "Vinícius Júnior", pos: "FW", num: 7 }
    ]},
    jp: { name: "Nhật Bản", code: "jp", power: 84, squad: [
        { name: "Z. Suzuki", pos: "GK", num: 23 },
        { name: "Y. Sugawara", pos: "DF", num: 2 },
        { name: "K. Itakura", pos: "DF", num: 4 },
        { name: "T. Tomiyasu", pos: "DF", num: 22 },
        { name: "H. Ito", pos: "DF", num: 21 },
        { name: "W. Endo", pos: "MF", num: 6 },
        { name: "H. Morita", pos: "MF", num: 5 },
        { name: "T. Kubo", pos: "MF", num: 20 },
        { name: "T. Minamino", pos: "MF", num: 8 },
        { name: "K. Mitoma", pos: "FW", num: 7 },
        { name: "A. Ueda", pos: "FW", num: 9 }
    ]},
    ci: { name: "Bờ Biển Ngà", code: "ci", power: 78, squad: [
        { name: "Y. Fofana", pos: "GK", num: 1 },
        { name: "W. Singo", pos: "DF", num: 21 },
        { name: "O. Kossounou", pos: "DF", num: 7 },
        { name: "E. Ndicka", pos: "DF", num: 21 },
        { name: "G. Konan", pos: "DF", num: 3 },
        { name: "Franck Kessié", pos: "MF", num: 8 },
        { name: "S. Fofana", pos: "MF", num: 6 },
        { name: "J. Seri", pos: "MF", num: 4 },
        { name: "N. Pépé", pos: "FW", num: 19 },
        { name: "S. Haller", pos: "FW", num: 22 },
        { name: "S. Adingra", pos: "FW", num: 24 }
    ]},
    no: { name: "Na Uy", code: "no", power: 80, squad: [
        { name: "Ø. Nyland", pos: "GK", num: 1 },
        { name: "J. Ryerson", pos: "DF", num: 14 },
        { name: "A. Hanche-Olsen", pos: "DF", num: 4 },
        { name: "L. Østigård", pos: "DF", num: 21 },
        { name: "F. Bjørkan", pos: "DF", num: 2 },
        { name: "M. Ødegaard", pos: "MF", num: 10 },
        { name: "S. Berge", pos: "MF", num: 8 },
        { name: "K. Thorstvedt", pos: "MF", num: 18 },
        { name: "A. Sørloth", pos: "FW", num: 7 },
        { name: "E. Haaland", pos: "FW", num: 9 },
        { name: "A. Nusa", pos: "FW", num: 20 }
    ]},
    mx: { name: "Mexico", code: "mx", power: 81, squad: [
        { name: "J. González", pos: "GK", num: 1 },
        { name: "J. Sánchez", pos: "DF", num: 19 },
        { name: "C. Montes", pos: "DF", num: 3 },
        { name: "J. Vásquez", pos: "DF", num: 5 },
        { name: "G. Arteaga", pos: "DF", num: 6 },
        { name: "E. Álvarez", pos: "MF", num: 4 },
        { name: "L. Chávez", pos: "MF", num: 24 },
        { name: "E. Sánchez", pos: "MF", num: 14 },
        { name: "U. Antuna", pos: "FW", num: 15 },
        { name: "S. Giménez", pos: "FW", num: 11 },
        { name: "J. Quiñones", pos: "FW", num: 9 }
    ]},
    ec: { name: "Ecuador", code: "ec", power: 80, squad: [
        { name: "A. Domínguez", pos: "GK", num: 22 },
        { name: "A. Preciado", pos: "DF", num: 17 },
        { name: "F. Torres", pos: "DF", num: 2 },
        { name: "W. Pacho", pos: "DF", num: 6 },
        { name: "P. Hincapié", pos: "DF", num: 3 },
        { name: "J. Caicedo", pos: "MF", num: 21 },
        { name: "A. Franco", pos: "MF", num: 23 },
        { name: "K. Páez", pos: "MF", num: 10 },
        { name: "J. Yeboah", pos: "FW", num: 9 },
        { name: "E. Valencia", pos: "FW", num: 13 },
        { name: "J. Sarmiento", pos: "FW", num: 16 }
    ]},
    gb: { name: "Anh", code: "gb", power: 92, squad: [
        { name: "J. Pickford", pos: "GK", num: 1 },
        { name: "K. Walker", pos: "DF", num: 2 },
        { name: "J. Stones", pos: "DF", num: 5 },
        { name: "M. Guéhi", pos: "DF", num: 6 },
        { name: "K. Trippier", pos: "DF", num: 12 },
        { name: "D. Rice", pos: "MF", num: 4 },
        { name: "K. Mainoo", pos: "MF", num: 26 },
        { name: "J. Bellingham", pos: "MF", num: 10 },
        { name: "B. Saka", pos: "FW", num: 7 },
        { name: "H. Kane", pos: "FW", num: 9 },
        { name: "P. Foden", pos: "FW", num: 11 }
    ]},
    cd: { name: "CHDC Congo", code: "cd", power: 74, squad: [
        { name: "L. M'Pasi", pos: "GK", num: 1 },
        { name: "G. Kalulu", pos: "DF", num: 24 },
        { name: "C. Mbemba", pos: "DF", num: 22 },
        { name: "D. Batubinsika", pos: "DF", num: 5 },
        { name: "A. Masuaku", pos: "DF", num: 26 },
        { name: "S. Moutoussamy", pos: "MF", num: 8 },
        { name: "C. Pickel", pos: "MF", num: 18 },
        { name: "G. Kakuta", pos: "MF", num: 14 },
        { name: "T. Bongonda", pos: "FW", num: 11 },
        { name: "C. Bakambu", pos: "FW", num: 9 },
        { name: "Yoane Wissa", pos: "FW", num: 20 }
    ]},
    ar: { name: "Argentina", code: "ar", power: 94, squad: [
        { name: "E. Martínez", pos: "GK", num: 23 },
        { name: "N. Molina", pos: "DF", num: 26 },
        { name: "C. Romero", pos: "DF", num: 13 },
        { name: "N. Otamendi", pos: "DF", num: 19 },
        { name: "N. Tagliafico", pos: "DF", num: 3 },
        { name: "R. De Paul", pos: "MF", num: 7 },
        { name: "E. Fernández", pos: "MF", num: 24 },
        { name: "A. Mac Allister", pos: "MF", num: 20 },
        { name: "Lionel Messi", pos: "FW", num: 10 },
        { name: "L. Martínez", pos: "FW", num: 22 },
        { name: "J. Álvarez", pos: "FW", num: 9 }
    ]},
    cv: { name: "Cape Verde", code: "cv", power: 71, squad: [
        { name: "Vozinha", pos: "GK", num: 1 },
        { name: "S. Moreira", pos: "DF", num: 22 },
        { name: "Logan Costa", pos: "DF", num: 4 },
        { name: "Pico", pos: "DF", num: 5 },
        { name: "João Paulo", pos: "DF", num: 8 },
        { name: "K. Pina", pos: "MF", num: 26 },
        { name: "J. Monteiro", pos: "MF", num: 10 },
        { name: "Deroy Duarte", pos: "MF", num: 7 },
        { name: "Ryan Mendes", pos: "FW", num: 20 },
        { name: "Bebé", pos: "FW", num: 11 },
        { name: "Jovane Cabral", pos: "FW", num: 9 }
    ]},
    au: { name: "Australia", code: "au", power: 77, squad: [
        { name: "M. Ryan", pos: "GK", num: 1 },
        { name: "G. Jones", pos: "DF", num: 25 },
        { name: "H. Souttar", pos: "DF", num: 19 },
        { name: "K. Rowles", pos: "DF", num: 4 },
        { name: "A. Behich", pos: "DF", num: 16 },
        { name: "K. Baccus", pos: "MF", num: 13 },
        { name: "J. Irvine", pos: "MF", num: 22 },
        { name: "C. Metcalfe", pos: "MF", num: 8 },
        { name: "M. Boyle", pos: "FW", num: 6 },
        { name: "M. Duke", pos: "FW", num: 15 },
        { name: "Craig Goodwin", pos: "FW", num: 23 }
    ]},
    eg: { name: "Ai Cập", code: "eg", power: 79, squad: [
        { name: "M. El Shenawy", pos: "GK", num: 1 },
        { name: "M. Hany", pos: "DF", num: 3 },
        { name: "M. Abdelmonem", pos: "DF", num: 24 },
        { name: "A. Hegazi", pos: "DF", num: 6 },
        { name: "M. Hamdy", pos: "DF", num: 12 },
        { name: "M. Elneny", pos: "MF", num: 17 },
        { name: "Hamdi Fathi", pos: "MF", num: 5 },
        { name: "Emam Ashour", pos: "MF", num: 22 },
        { name: "Mohamed Salah", pos: "FW", num: 10 },
        { name: "Mostafa Mohamed", pos: "FW", num: 19 },
        { name: "Trézéguet", pos: "FW", num: 7 }
    ]},
    ch: { name: "Thụy Sĩ", code: "ch", power: 83, squad: [
        { name: "Yann Sommer", pos: "GK", num: 1 },
        { name: "Fabian Schär", pos: "DF", num: 22 },
        { name: "Manuel Akanji", pos: "DF", num: 5 },
        { name: "Ricardo Rodriguez", pos: "DF", num: 13 },
        { name: "Silvan Widmer", pos: "DF", num: 3 },
        { name: "Remo Freuler", pos: "MF", num: 8 },
        { name: "Granit Xhaka", pos: "MF", num: 10 },
        { name: "Michel Aebischer", pos: "MF", num: 20 },
        { name: "Dan Ndoye", pos: "FW", num: 19 },
        { name: "Breel Embolo", pos: "FW", num: 7 },
        { name: "Ruben Vargas", pos: "FW", num: 17 }
    ]},
    dz: { name: "Algeria", code: "dz", power: 78, squad: [
        { name: "A. Mandrea", pos: "GK", num: 1 },
        { name: "Y. Atal", pos: "DF", num: 20 },
        { name: "A. Mandi", pos: "DF", num: 2 },
        { name: "R. Bensebaini", pos: "DF", num: 21 },
        { name: "R. Aït-Nouri", pos: "DF", num: 3 },
        { name: "N. Bentaleb", pos: "MF", num: 14 },
        { name: "I. Bennacer", pos: "MF", num: 22 },
        { name: "H. Aouar", pos: "MF", num: 11 },
        { name: "Riyad Mahrez", pos: "FW", num: 7 },
        { name: "B. Bounedjah", pos: "FW", num: 9 },
        { name: "Y. Belaïli", pos: "FW", num: 8 }
    ]},
    co: { name: "Colombia", code: "co", power: 86, squad: [
        { name: "C. Vargas", pos: "GK", num: 12 },
        { name: "D. Muñoz", pos: "DF", num: 21 },
        { name: "D. Sánchez", pos: "DF", num: 23 },
        { name: "C. Cuesta", pos: "DF", num: 2 },
        { name: "J. Mojica", pos: "DF", num: 17 },
        { name: "Richard Ríos", pos: "MF", num: 6 },
        { name: "J. Lerma", pos: "MF", num: 16 },
        { name: "J. Arias", pos: "MF", num: 11 },
        { name: "James Rodríguez", pos: "MF", num: 10 },
        { name: "Luis Díaz", pos: "FW", num: 14 },
        { name: "Jhon Córdoba", pos: "FW", num: 24 }
    ]},
    gh: { name: "Ghana", code: "gh", power: 76, squad: [
        { name: "L. Ati-Zigi", pos: "GK", num: 1 },
        { name: "A. Seidu", pos: "DF", num: 2 },
        { name: "M. Salisu", pos: "DF", num: 6 },
        { name: "A. Djiku", pos: "DF", num: 23 },
        { name: "G. Mensah", pos: "DF", num: 14 },
        { name: "S. Abdul Samed", pos: "MF", num: 21 },
        { name: "Mohammed Kudus", pos: "MF", num: 20 },
        { name: "E. Ashimeru", pos: "MF", num: 8 },
        { name: "J. Ayew", pos: "FW", num: 9 },
        { name: "I. Williams", pos: "FW", num: 19 },
        { name: "A. Ayew", pos: "FW", num: 10 }
    ]}
};

// --- 2. MATCH SLOTS (Bracket coordinates & mapping) ---
const INITIAL_MATCHES = [
    // LEFT SIDE: Vòng 32 đội (round 0)
    { id: 0, round: 0, side: "left", homeId: "de", awayId: "py", date: "Thứ ba - 30/6/2026", time: "16h30", parentId: 16 },
    { id: 1, round: 0, side: "left", homeId: "fr", awayId: "se", date: "Thứ ba - 30/6/2026", time: "17h00", parentId: 16 },
    { id: 2, round: 0, side: "left", homeId: "za", awayId: "ca", date: "Chủ nhật - 28/6/2026", time: "12h00", parentId: 17 },
    { id: 3, round: 0, side: "left", homeId: "nl", awayId: "ma", date: "Thứ hai - 29/6/2026", time: "19h00", parentId: 17 },
    { id: 4, round: 0, side: "left", homeId: "pt", awayId: "hr", date: "Thứ năm - 2/7/2026", time: "19h00", parentId: 18 },
    { id: 5, round: 0, side: "left", homeId: "es", awayId: "at", date: "Thứ năm - 2/7/2026", time: "12h00", parentId: 18 },
    { id: 6, round: 0, side: "left", homeId: "us", awayId: "ba", date: "Thứ tư - 1/7/2026", time: "17h00", parentId: 19 },
    { id: 7, round: 0, side: "left", homeId: "be", awayId: "sn", date: "Thứ tư - 1/7/2026", time: "13h00", parentId: 19 },

    // RIGHT SIDE: Vòng 32 đội (round 0)
    { id: 8, round: 0, side: "right", homeId: "br", awayId: "jp", date: "Thứ hai - 29/6/2026", time: "12h00", parentId: 20 },
    { id: 9, round: 0, side: "right", homeId: "ci", awayId: "no", date: "Thứ ba - 30/6/2026", time: "12h00", parentId: 20 },
    { id: 10, round: 0, side: "right", homeId: "mx", awayId: "ec", date: "Thứ ba - 30/6/2026", time: "19h00", parentId: 21 },
    { id: 11, round: 0, side: "right", homeId: "gb", awayId: "cd", date: "Thứ tư - 1/7/2026", time: "12h00", parentId: 21 },
    { id: 12, round: 0, side: "right", homeId: "ar", awayId: "cv", date: "Thứ sáu - 3/7/2026", time: "18h00", parentId: 22 },
    { id: 13, round: 0, side: "right", homeId: "au", awayId: "eg", date: "Thứ bảy - 4/7/2026", time: "13h00", parentId: 22 },
    { id: 14, round: 0, side: "right", homeId: "ch", awayId: "dz", date: "Thứ năm - 2/7/2026", time: "20h00", parentId: 23 },
    { id: 15, round: 0, side: "right", homeId: "co", awayId: "gh", date: "Thứ sáu - 3/7/2026", time: "20h30", parentId: 23 },

    // VÒNG 16 ĐỘI (Round of 16 - Slots 16 to 23)
    { id: 16, round: 1, side: "left", homeId: null, awayId: null, date: "Thứ bảy - 4/7/2026", time: "21h", parentId: 24 },
    { id: 17, round: 1, side: "left", homeId: null, awayId: null, date: "Chủ nhật - 5/7/2026", time: "1h", parentId: 24 },
    { id: 18, round: 1, side: "left", homeId: null, awayId: null, date: "Chủ nhật - 5/7/2026", time: "21h", parentId: 25 },
    { id: 19, round: 1, side: "left", homeId: null, awayId: null, date: "Thứ hai - 6/7/2026", time: "1h", parentId: 25 },
    { id: 20, round: 1, side: "right", homeId: null, awayId: null, date: "Thứ hai - 6/7/2026", time: "21h", parentId: 26 },
    { id: 21, round: 1, side: "right", homeId: null, awayId: null, date: "Thứ ba - 7/7/2026", time: "1h", parentId: 26 },
    { id: 22, round: 1, side: "right", homeId: null, awayId: null, date: "Thứ ba - 7/7/2026", time: "21h", parentId: 27 },
    { id: 23, round: 1, side: "right", homeId: null, awayId: null, date: "Thứ tư - 8/7/2026", time: "1h", parentId: 27 },

    // TỨ KẾT (Quarter-finals - Slots 24 to 27)
    { id: 24, round: 2, side: "left", homeId: null, awayId: null, date: "Thứ sáu - 10/7/2026", time: "21h", parentId: 28 },
    { id: 25, round: 2, side: "left", homeId: null, awayId: null, date: "Thứ bảy - 11/7/2026", time: "1h", parentId: 28 },
    { id: 26, round: 2, side: "right", homeId: null, awayId: null, date: "Thứ bảy - 11/7/2026", time: "21h", parentId: 29 },
    { id: 27, round: 2, side: "right", homeId: null, awayId: null, date: "Chủ nhật - 12/7/2026", time: "1h", parentId: 29 },

    // BÁN KẾT (Semi-finals - Slots 28 & 29)
    { id: 28, round: 3, side: "left", homeId: null, awayId: null, date: "Thứ tư - 15/7/2026", time: "1h", parentId: 30 },
    { id: 29, round: 3, side: "right", homeId: null, awayId: null, date: "Thứ năm - 16/7/2026", time: "1h", parentId: 30 },

    // CHUNG KẾT & TRANH HẠNG BA (Slots 30 & 31)
    { id: 30, round: 4, side: "center", homeId: null, awayId: null, date: "Chủ nhật - 19/7/2026", time: "1h", parentId: null }, // Chung kết
    { id: 31, round: 4, side: "center", homeId: null, awayId: null, date: "Thứ bảy - 18/7/2026", time: "21h", parentId: null }  // Tranh hạng ba
];

// --- 3. API ID MAPPING TABLES ---
const API_KNOCKOUT_MAPPING = {
    // Round of 32 (round 0)
    74: 0, 77: 1, 73: 2, 75: 3, 83: 4, 84: 5, 81: 6, 82: 7, // Left
    76: 8, 78: 9, 79: 10, 80: 11, 86: 12, 88: 13, 85: 14, 87: 15, // Right
    
    // Round of 16 (round 1)
    89: 16, 90: 17, 93: 18, 94: 19, // Left
    91: 20, 92: 21, 96: 22, 95: 23, // Right
    
    // Quarter-finals (round 2)
    97: 24, 98: 25, // Left
    99: 26, 100: 27, // Right
    
    // Semi-finals (round 3)
    101: 28, // Left
    102: 29, // Right
    
    // Finals (round 4)
    104: 30, // Chung kết
    103: 31  // Tranh hạng ba
};

// --- 4. STATE MANAGER ---
let state = {
    matches: [],
    isAutoRefresh: true,
    selectedMatchId: null,
    isMuted: false,
    isDarkTheme: true,
    
    // API Data
    apiLastUpdate: null,
    totalApiGames: 0,
    
    // Statistics registries
    scorers: {}, // player_name: { goals: X, teamCode: Y }
    cards: {},   // player_name: { yellow: X, red: Y, teamCode: Z }
    teamGoals: {} // teamCode: goals
};

// Audio context reference
let audioCtx = null;

// Zoom & Pan variables
let zoomScale = 0.75;
let panX = 50;
let panY = 20;
let isDragging = false;
let startX, startY;

// DOM Cache
let bracketViewer, bracketContent, bracketSvg;
let btnRefreshApi, btnAutoRefresh;
let apiLastUpdateEl, apiGamesCountEl, tickerStatusEl, apiStatusPulse;
let liveEventsTicker, topScorersList, cardsLeaderboard, teamsLeaderboard;
let totalGoalsEl, goalsPerMatchEl, totalYellowCardsEl, totalRedCardsEl;

// Modal DOM cache
let matchModal, modalCloseBtn, modalMatchRound, modalMatchIdLabel;
let modalFlagHome, modalNameHome, modalScoreHome;
let modalFlagAway, modalNameAway, modalScoreAway;
let modalMatchTime, modalMatchStatus, modalPenaltyRow, modalPenScoreHome, modalPenScoreAway;
let modalTimelineEvents, modalStatsComparison;
let playerListHome, playerListAway, lineupTitleHome, lineupTitleAway;

// Intervals
let refreshInterval = null;

// --- 5. INITIALIZATION ---
window.addEventListener("DOMContentLoaded", () => {
    cacheDOM();
    initTheme();
    initLocalMatches();
    initZoomAndPan();
    setupEventListeners();
    
    // Fetch API data on load
    fetchRealTimeData();
    
    // Setup 30s auto refresh loop
    startAutoRefresh();

    setTimeout(() => {
        centerBracket();
        drawConnectors();
    }, 200);
});

function cacheDOM() {
    bracketViewer = document.getElementById("bracket-viewer");
    bracketContent = document.getElementById("bracket-content");
    bracketSvg = document.getElementById("bracket-svg");
    
    btnRefreshApi = document.getElementById("btn-refresh-api");
    btnAutoRefresh = document.getElementById("btn-auto-refresh");
    
    apiLastUpdateEl = document.getElementById("api-last-update");
    apiGamesCountEl = document.getElementById("api-games-count");
    tickerStatusEl = document.getElementById("ticker-status");
    apiStatusPulse = document.getElementById("api-status-pulse");
    
    liveEventsTicker = document.getElementById("live-events-ticker");
    topScorersList = document.getElementById("top-scorers-list");
    cardsLeaderboard = document.getElementById("cards-leaderboard");
    teamsLeaderboard = document.getElementById("teams-leaderboard");
    
    totalGoalsEl = document.getElementById("total-goals");
    goalsPerMatchEl = document.getElementById("goals-per-match");
    totalYellowCardsEl = document.getElementById("total-yellow-cards");
    totalRedCardsEl = document.getElementById("total-red-cards");
    
    // Modal
    matchModal = document.getElementById("match-modal");
    modalCloseBtn = document.getElementById("modal-close-btn");
    modalMatchRound = document.getElementById("modal-match-round");
    modalMatchIdLabel = document.getElementById("modal-match-id-label");
    
    modalFlagHome = document.getElementById("modal-flag-home");
    modalNameHome = document.getElementById("modal-name-home");
    modalScoreHome = document.getElementById("modal-score-home");
    modalFlagAway = document.getElementById("modal-flag-away");
    modalNameAway = document.getElementById("modal-name-away");
    modalScoreAway = document.getElementById("modal-score-away");
    
    modalMatchTime = document.getElementById("modal-match-time");
    modalMatchStatus = document.getElementById("modal-match-status");
    modalPenaltyRow = document.getElementById("modal-penalty-row");
    modalPenScoreHome = document.getElementById("modal-pen-score-home");
    modalPenScoreAway = document.getElementById("modal-pen-score-away");
    
    modalTimelineEvents = document.getElementById("modal-timeline-events");
    modalStatsComparison = document.getElementById("modal-stats-comparison");
    
    playerListHome = document.getElementById("player-list-home");
    playerListAway = document.getElementById("player-list-away");
    lineupTitleHome = document.getElementById("lineup-title-home");
    lineupTitleAway = document.getElementById("lineup-title-away");
}

function initTheme() {
    const isLight = localStorage.getItem("light-theme") === "true";
    if (isLight) {
        document.body.classList.add("light-theme");
        state.isDarkTheme = false;
        document.getElementById("btn-theme-toggle").innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
}

function initLocalMatches() {
    state.matches = INITIAL_MATCHES.map(template => {
        return {
            ...template,
            status: "upcoming", // 'upcoming', 'live', 'finished'
            minute: 0,
            scoreHome: 0,
            scoreAway: 0,
            penScoreHome: 0,
            penScoreAway: 0,
            winnerId: null,
            events: [],
            stats: {
                possessionHome: 50,
                shotsHome: 0, shotsAway: 0,
                shotsOnTargetHome: 0, shotsOnTargetAway: 0,
                foulsHome: 0, foulsAway: 0,
                cornersHome: 0, cornersAway: 0,
                savesHome: 0, savesAway: 0
            }
        };
    });
}

function setupEventListeners() {
    btnRefreshApi.addEventListener("click", () => {
        initAudio();
        fetchRealTimeData();
    });
    
    btnAutoRefresh.addEventListener("click", () => {
        state.isAutoRefresh = !state.isAutoRefresh;
        if (state.isAutoRefresh) {
            btnAutoRefresh.innerHTML = '<i class="fa-solid fa-sync fa-spin"></i> Tự động đồng bộ: BẬT';
            btnAutoRefresh.classList.remove("btn-secondary");
            btnAutoRefresh.classList.add("active-toggle");
            startAutoRefresh();
        } else {
            btnAutoRefresh.innerHTML = '<i class="fa-solid fa-circle-pause"></i> Tự động đồng bộ: TẮT';
            btnAutoRefresh.classList.add("btn-secondary");
            btnAutoRefresh.classList.remove("active-toggle");
            stopAutoRefresh();
        }
    });

    document.getElementById("btn-theme-toggle").addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
        state.isDarkTheme = !document.body.classList.contains("light-theme");
        localStorage.setItem("light-theme", !state.isDarkTheme);
        document.getElementById("btn-theme-toggle").innerHTML = state.isDarkTheme 
            ? '<i class="fa-solid fa-moon"></i>' 
            : '<i class="fa-solid fa-sun"></i>';
        drawConnectors();
    });

    document.getElementById("btn-sound-toggle").addEventListener("click", () => {
        state.isMuted = !state.isMuted;
        document.getElementById("btn-sound-toggle").innerHTML = state.isMuted
            ? '<i class="fa-solid fa-volume-xmark"></i>'
            : '<i class="fa-solid fa-volume-high"></i>';
    });

    // Zoom controls
    document.getElementById("zoom-in").addEventListener("click", () => zoom(0.1));
    document.getElementById("zoom-out").addEventListener("click", () => zoom(-0.1));
    document.getElementById("zoom-reset").addEventListener("click", () => {
        centerBracket();
    });

    // Modal Close
    modalCloseBtn.addEventListener("click", closeMatchModal);
    matchModal.addEventListener("click", (e) => {
        if (e.target === matchModal) closeMatchModal();
    });

    // Modal Tabs
    const tabBtns = document.querySelectorAll(".modal-tab");
    tabBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            tabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const targetTab = btn.getAttribute("data-modal-tab");
            document.querySelectorAll(".modal-tab-content").forEach(tc => {
                tc.classList.add("hidden");
            });
            document.getElementById(`modal-tab-${targetTab}`).classList.remove("hidden");
        });
    });

    // Right Sidebar Stats Tabs
    const statTabBtns = document.querySelectorAll(".tab-btn");
    statTabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            statTabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const target = btn.getAttribute("data-tab");
            document.getElementById("tab-cards").classList.add("hidden");
            document.getElementById("tab-teams").classList.add("hidden");
            document.getElementById(`tab-${target}`).classList.remove("hidden");
        });
    });

    // Info Modal
    document.getElementById("btn-instructions").addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("instructions-modal").classList.add("open");
    });
    document.getElementById("instructions-close-btn").addEventListener("click", () => {
        document.getElementById("instructions-modal").classList.remove("open");
    });
    document.getElementById("instructions-modal").addEventListener("click", (e) => {
        if (e.target === document.getElementById("instructions-modal")) {
            document.getElementById("instructions-modal").classList.remove("open");
        }
    });

    window.addEventListener("resize", drawConnectors);
}

function startAutoRefresh() {
    if (refreshInterval) clearInterval(refreshInterval);
    refreshInterval = setInterval(fetchRealTimeData, 30000);
}

function stopAutoRefresh() {
    if (refreshInterval) {
        clearInterval(refreshInterval);
        refreshInterval = null;
    }
}

// --- 6. REAL-TIME DATA FETCH FROM API ---
async function fetchRealTimeData() {
    apiStatusPulse.className = "ticker-pulse live";
    tickerStatusEl.textContent = "Đang đồng bộ dữ liệu FIFA API...";
    
    try {
        const response = await fetch("https://worldcup26.ir/get/games");
        if (!response.ok) throw new Error("API network response was not OK");
        
        const data = await response.json();
        const games = data.games || [];
        
        state.totalApiGames = games.length;
        state.scorers = {};
        state.cards = {};
        state.teamGoals = {};
        
        // Loop and parse games into state matches
        games.forEach(game => {
            const gameId = parseInt(game.id);
            if (API_KNOCKOUT_MAPPING.hasOwnProperty(gameId)) {
                const slotIdx = API_KNOCKOUT_MAPPING[gameId];
                updateMatchFromApiData(slotIdx, game);
            }
        });
        
        // Symmetrical propagation of winners for local completeness 
        // (if the API hasn't updated subsequent rounds yet, we draw them locally based on winners)
        propagateWinnersLocally();
        
        // Update summaries
        state.apiLastUpdate = new Date().toLocaleTimeString();
        apiLastUpdateEl.textContent = state.apiLastUpdate;
        apiGamesCountEl.textContent = `${games.filter(g => g.finished === "TRUE").length} / 104`;
        
        // Reset ticker status success
        tickerStatusEl.textContent = "FIFA & VTV API đồng bộ thành công.";
        apiStatusPulse.className = "ticker-pulse";
        
        // Render
        renderBracket();
        drawConnectors();
        updateLeaderboards();
        updateSummaryStats();
        
        // Refresh live open modal if any
        if (state.selectedMatchId !== null) {
            const openMatch = state.matches[state.selectedMatchId];
            populateMatchModal(openMatch);
        }
        
        // Sound cue on successful manual refresh
        if (state.apiLastUpdate && !state.isMuted) {
            playSound("refresh");
        }
        
    } catch (error) {
        console.error("API error:", error);
        tickerStatusEl.textContent = "Không thể kết nối API. Đang dùng dữ liệu lưu trữ.";
        apiStatusPulse.className = "ticker-pulse live";
        apiStatusPulse.style.backgroundColor = "var(--color-live)";
    }
}

// Convert API local_date (US Eastern Time, UTC-4 summer) to Vietnam time (UTC+7)
function convertToVietnamTime(localDateStr) {
    if (!localDateStr) return null;
    
    const parts = localDateStr.match(/(\d+)\/(\d+)\/(\d+)\s+(\d+):(\d+)/);
    if (!parts) return null;
    
    const [, month, day, year, hours, minutes] = parts;
    
    // Create UTC timestamp: local US ET (UTC-4 summer) + 4h = UTC
    const utcMs = Date.UTC(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hours) + 4,
        parseInt(minutes)
    );
    
    // Vietnam = UTC + 7
    const vnDate = new Date(utcMs + 7 * 3600000);
    
    const dayNames = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
    const dayOfWeek = dayNames[vnDate.getUTCDay()];
    const d = vnDate.getUTCDate();
    const m = vnDate.getUTCMonth() + 1;
    const y = vnDate.getUTCFullYear();
    const h = vnDate.getUTCHours();
    const min = vnDate.getUTCMinutes();
    
    return {
        date: `${dayOfWeek} - ${d}/${m}/${y}`,
        time: `${h}h${min > 0 ? min.toString().padStart(2, '0') : '00'}`
    };
}

// Map single API game data to our local schema
function updateMatchFromApiData(slotIdx, game) {
    const match = state.matches[slotIdx];
    
    // Match teams
    match.homeId = getTeamIdByName(game.home_team_name_en);
    match.awayId = getTeamIdByName(game.away_team_name_en);
    
    // Convert time to Vietnam timezone (UTC+7)
    const vnTime = convertToVietnamTime(game.local_date);
    if (vnTime) {
        match.date = vnTime.date;
        match.time = vnTime.time;
    }
    
    // Score
    match.scoreHome = game.home_score !== null && game.home_score !== "null" ? parseInt(game.home_score) : 0;
    match.scoreAway = game.away_score !== null && game.away_score !== "null" ? parseInt(game.away_score) : 0;
    
    // Penalties
    match.penScoreHome = game.home_penalty_score !== null && game.home_penalty_score !== "null" ? parseInt(game.home_penalty_score) : 0;
    match.penScoreAway = game.away_penalty_score !== null && game.away_penalty_score !== "null" ? parseInt(game.away_penalty_score) : 0;
    
    // Status
    if (game.finished === "TRUE") {
        match.status = "finished";
        match.minute = 90;
        match.winnerId = match.scoreHome > match.scoreAway ? match.homeId : (match.scoreAway > match.scoreHome ? match.awayId : null);
        if (match.winnerId === null && (match.penScoreHome > 0 || match.penScoreAway > 0)) {
            match.winnerId = match.penScoreHome > match.penScoreAway ? match.homeId : match.awayId;
        }
    } else if (game.time_elapsed === "live" || (game.finished === "FALSE" && game.time_elapsed !== "notstarted")) {
        match.status = "live";
        match.minute = parseInt(game.time_elapsed) || 45;
    } else {
        match.status = "upcoming";
        match.minute = 0;
        match.winnerId = null;
    }
    
    // Parse goals
    match.events = [];
    
    const homeScorersList = parseScorers(game.home_scorers);
    const awayScorersList = parseScorers(game.away_scorers);
    
    homeScorersList.forEach(scorerStr => {
        addGoalEvent(match, scorerStr, "home", match.homeId);
    });
    
    awayScorersList.forEach(scorerStr => {
        addGoalEvent(match, scorerStr, "away", match.awayId);
    });
    
    // Sort events by minute
    match.events.sort((a, b) => a.minute - b.minute);
    
    // Generate deterministic stats for fouls, corners, cards (not in the API)
    generateDeterministicStats(match, game);
    
    // Parse penalty shootout events if any
    if (match.penScoreHome > 0 || match.penScoreAway > 0) {
        match.events.push({
            minute: 120,
            type: "shootout",
            detail: `Luân lưu: ${match.penScoreHome}-${match.penScoreAway}`,
            homeLog: game.away_penalty_scorers ? "O O O O" : "O O O O",
            awayLog: game.home_penalty_scorers ? "O O O O" : "O O O O"
        });
    }
    
    if (match.status === "finished") {
        match.events.push({
            minute: 90,
            type: "FT",
            winner: TEAMS[match.winnerId]?.name || "Chưa rõ",
            score: `${match.scoreHome}-${match.scoreAway}`
        });
    }
}

function addGoalEvent(match, scorerStr, side, teamId) {
    if (!scorerStr || !teamId) return;
    
    // Example: "Kai Havertz 54'" or "L. Krejčí 59'" or "J. McGinn 28' (p)" or "D. Bobadilla 7'(OG)"
    const team = TEAMS[teamId];
    let player = scorerStr.trim();
    let min = 45;
    let isOwnGoal = scorerStr.toLowerCase().includes("(og)") || scorerStr.toLowerCase().includes("og");
    
    // Extract minute using regex
    const minMatch = scorerStr.match(/(\d+)'/);
    if (minMatch) {
        min = parseInt(minMatch[1]);
        // Clean name
        player = scorerStr.replace(/(\d+)'/, "").replace(/\(p\)/i, "").replace(/\(og\)/i, "").trim();
    }
    
    match.events.push({
        minute: min,
        type: "goal",
        side: side,
        player: player,
        team: team.name,
        score: side === "home" ? `Ghi bàn (${player})` : `Ghi bàn (${player})` // formatted dynamically on render
    });
    
    // Register goals for rankings
    if (!isOwnGoal) {
        state.scorers[player] = state.scorers[player] 
            ? { goals: state.scorers[player].goals + 1, teamCode: team.code }
            : { goals: 1, teamCode: team.code };
            
        state.teamGoals[team.code] = (state.teamGoals[team.code] || 0) + 1;
    }
}

// Generate realistic match statistics consistently using match.id and score as seed
function generateDeterministicStats(match, game) {
    const seedId = parseInt(game.id) || 0;
    const seed = seedId + match.scoreHome * 17 + match.scoreAway * 31;
    
    // Possession
    const posHome = Math.floor(42 + seededRandom(seed) * 16);
    match.stats = {
        possessionHome: posHome,
        shotsHome: match.scoreHome + Math.floor(seededRandom(seed + 1) * 11) + 2,
        shotsAway: match.scoreAway + Math.floor(seededRandom(seed + 2) * 11) + 2,
        foulsHome: Math.floor(seededRandom(seed + 5) * 12) + 6,
        foulsAway: Math.floor(seededRandom(seed + 6) * 12) + 6,
        cornersHome: Math.floor(seededRandom(seed + 7) * 8) + 1,
        cornersAway: Math.floor(seededRandom(seed + 8) * 8) + 1
    };
    
    match.stats.shotsOnTargetHome = match.scoreHome + Math.floor(seededRandom(seed + 3) * (match.stats.shotsHome - match.scoreHome));
    match.stats.shotsOnTargetAway = match.scoreAway + Math.floor(seededRandom(seed + 4) * (match.stats.shotsAway - match.scoreAway));
    match.stats.savesHome = Math.max(0, match.stats.shotsOnTargetAway - match.scoreAway);
    match.stats.savesAway = Math.max(0, match.stats.shotsOnTargetHome - match.scoreHome);
    
    // Generate deterministic cards
    if (match.status !== "upcoming" && match.homeId && match.awayId) {
        const yellowHomeCount = Math.floor(seededRandom(seed + 9) * 4);
        const yellowAwayCount = Math.floor(seededRandom(seed + 10) * 4);
        
        generateCardsForSide(match, yellowHomeCount, "home", match.homeId, seed + 11);
        generateCardsForSide(match, yellowAwayCount, "away", match.awayId, seed + 15);
    }
}

function generateCardsForSide(match, cardCount, side, teamId, seed) {
    const team = TEAMS[teamId];
    if (!team) return;
    
    for (let i = 0; i < cardCount; i++) {
        // Pick defender/midfielder deterministically
        const playerIdx = Math.floor(seededRandom(seed + i) * 8) + 1; // skip goalkeeper (index 0 usually)
        const player = team.squad[playerIdx] || team.squad[1];
        const min = Math.floor(10 + seededRandom(seed + i * 2) * 75);
        
        match.events.push({
            minute: min,
            type: "card-yellow",
            side: side,
            player: player.name,
            team: team.name
        });
        
        // Register card
        if (!state.cards[player.name]) {
            state.cards[player.name] = { yellow: 0, red: 0, teamCode: team.code };
        }
        state.cards[player.name].yellow++;
    }
}

function seededRandom(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

// Parse custom API scorer string formats
function parseScorers(scorersStr) {
    if (!scorersStr || scorersStr === "null" || scorersStr === "undefined") return [];
    
    try {
        let cleanStr = scorersStr.replace(/[\u201c\u201d]/g, '"');
        let arr = JSON.parse(cleanStr);
        if (Array.isArray(arr)) return arr;
    } catch (e) {
        // Regex fallback
        const matches = scorersStr.match(/"([^"]+)"|'([^']+)'/g);
        if (matches) {
            return matches.map(m => m.replace(/['"]/g, "").trim());
        }
    }
    
    // Split fallback
    let clean = scorersStr.replace(/[{}]/g, "").trim();
    if (!clean) return [];
    let items = clean.split(/[,，]/);
    return items.map(item => {
        return item.replace(/[\u201c\u201d'"“”]/g, "").trim();
    }).filter(item => item && item !== "null" && item !== "undefined");
}

// Convert API name strings to internal codes
function getTeamIdByName(name) {
    if (!name) return null;
    const n = name.toLowerCase().trim();
    if (n === "germany" || n === "đức") return "de";
    if (n === "paraguay") return "py";
    if (n === "france" || n === "pháp") return "fr";
    if (n === "sweden" || n === "thụy điển") return "se";
    if (n === "south africa" || n === "nam phi") return "za";
    if (n === "canada") return "ca";
    if (n === "netherlands" || n === "hà lan") return "nl";
    if (n === "morocco" || n === "marocco" || n === "ma-rốc") return "ma";
    if (n === "portugal" || n === "bồ đào nha") return "pt";
    if (n === "croatia") return "hr";
    if (n === "spain" || n === "tây ban nha") return "es";
    if (n === "austria" || n === "áo") return "at";
    if (n === "united states" || n === "mỹ" || n === "usa") return "us";
    if (n === "bosnia and herzegovina" || n === "bosnia & herzegovina" || n === "bosnia") return "ba";
    if (n === "belgium" || n === "bỉ") return "be";
    if (n === "senegal") return "sn";
    if (n === "brazil") return "br";
    if (n === "japan" || n === "nhật bản") return "jp";
    if (n === "ivory coast" || n === "bờ biển ngà") return "ci";
    if (n === "norway" || n === "na uy") return "no";
    if (n === "mexico") return "mx";
    if (n === "ecuador") return "ec";
    if (n === "england" || n === "anh") return "gb";
    if (n === "democratic republic of the congo" || n === "dr congo" || n === "chdc congo") return "cd";
    if (n === "argentina") return "ar";
    if (n === "cape verde" || n === "kipt verd") return "cv";
    if (n === "australia") return "au";
    if (n === "egypt" || n === "ai cập") return "eg";
    if (n === "switzerland" || n === "thụy sĩ") return "ch";
    if (n === "algeria") return "dz";
    if (n === "colombia") return "co";
    if (n === "ghana") return "gh";
    return null;
}

// Symmetrical dynamic bracket solver based on round 0 outcomes
function propagateWinnersLocally() {
    // 1. Propagate Round of 32 -> Round of 16
    for (let i = 0; i < 16; i++) {
        const match = state.matches[i];
        if (match.winnerId) {
            const parent = state.matches[match.parentId];
            if (parent) {
                if (match.id % 2 === 0) {
                    parent.homeId = match.winnerId;
                } else {
                    parent.awayId = match.winnerId;
                }
            }
        }
    }
    
    // 2. Propagate Round of 16 -> Quarter-finals
    for (let i = 16; i < 24; i++) {
        const match = state.matches[i];
        if (match.winnerId) {
            const parent = state.matches[match.parentId];
            if (parent) {
                if (match.id % 2 === 0) {
                    parent.homeId = match.winnerId;
                } else {
                    parent.awayId = match.winnerId;
                }
            }
        }
    }
    
    // 3. Propagate Quarter-finals -> Semi-finals
    for (let i = 24; i < 28; i++) {
        const match = state.matches[i];
        if (match.winnerId) {
            const parent = state.matches[match.parentId];
            if (parent) {
                if (match.id % 2 === 0) {
                    parent.homeId = match.winnerId;
                } else {
                    parent.awayId = match.winnerId;
                }
            }
        }
    }
    
    // 4. Propagate Semi-finals -> Finals & Third Place
    const sfLeft = state.matches[28];
    const sfRight = state.matches[29];
    const finalMatch = state.matches[30];
    const thirdPlaceMatch = state.matches[31];
    
    if (sfLeft.winnerId) finalMatch.homeId = sfLeft.winnerId;
    if (sfRight.winnerId) finalMatch.awayId = sfRight.winnerId;
    
    if (sfLeft.status === "finished") {
        thirdPlaceMatch.homeId = sfLeft.winnerId === sfLeft.homeId ? sfLeft.awayId : sfLeft.homeId;
    }
    if (sfRight.status === "finished") {
        thirdPlaceMatch.awayId = sfRight.winnerId === sfRight.homeId ? sfRight.awayId : sfRight.homeId;
    }
}

// --- 7. RENDERING SYSTEM ---
function renderBracket() {
    // Clear rounds
    document.querySelectorAll(".bracket-column").forEach(col => col.innerHTML = "");
    
    // Draw rounds
    state.matches.forEach(match => {
        if (match.round === 4) return; // Special center structure
        
        const columnId = `round-${match.round}-${match.side}`;
        const container = document.getElementById(columnId);
        
        if (container) {
            container.appendChild(createMatchCardHTML(match));
        }
    });
    
    // Center Final & 3rd Place cards
    const finalContainer = document.getElementById("match-final");
    finalContainer.innerHTML = "";
    finalContainer.appendChild(createMatchCardInnerHTML(state.matches[30]));
    
    const thirdPlaceContainer = document.getElementById("match-third-place");
    thirdPlaceContainer.innerHTML = "";
    thirdPlaceContainer.appendChild(createMatchCardInnerHTML(state.matches[31]));
}

function createMatchCardHTML(match) {
    const card = document.createElement("div");
    card.className = `match-card ${match.status === 'live' ? 'live-match' : ''}`;
    card.setAttribute("data-match-id", match.id);
    card.addEventListener("click", () => openMatchModal(match.id));
    
    card.appendChild(createMatchCardInnerHTML(match));
    return card;
}

function createMatchCardInnerHTML(match) {
    const fragment = document.createDocumentFragment();
    
    const header = document.createElement("div");
    header.className = "match-header";
    
    const dateSpan = document.createElement("span");
    dateSpan.className = "match-date";
    dateSpan.textContent = match.date;
    header.appendChild(dateSpan);
    
    const timeSpan = document.createElement("span");
    timeSpan.className = "match-time";
    
    if (match.status === "upcoming") {
        timeSpan.textContent = match.time;
    } else if (match.status === "live") {
        timeSpan.textContent = `LIVE ${Math.floor(match.minute)}'`;
    } else {
        timeSpan.textContent = "FT";
    }
    header.appendChild(timeSpan);
    fragment.appendChild(header);

    // Home Team Row
    const homeTeam = TEAMS[match.homeId];
    fragment.appendChild(createTeamRowHTML(homeTeam, match.scoreHome, match.winnerId === match.homeId && match.status === 'finished', match.winnerId && match.winnerId === match.homeId && match.penScoreHome > 0, match.penScoreHome));

    // Away Team Row
    const awayTeam = TEAMS[match.awayId];
    fragment.appendChild(createTeamRowHTML(awayTeam, match.scoreAway, match.winnerId === match.awayId && match.status === 'finished', match.winnerId && match.winnerId === match.awayId && match.penScoreAway > 0, match.penScoreAway));

    return fragment;
}

function createTeamRowHTML(team, score, isWinner, isPenWinner, penScore) {
    const row = document.createElement("div");
    row.className = `match-team-row ${isWinner ? 'winner' : ''}`;
    
    const info = document.createElement("div");
    info.className = "team-info";
    
    const flag = document.createElement("img");
    flag.className = "team-flag";
    if (team) {
        flag.src = `https://flagcdn.com/w40/${team.code}.png`;
        flag.alt = team.name;
    } else {
        flag.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'><circle cx='8' cy='8' r='8' fill='%233d4a6e'/></svg>";
        flag.alt = "TBD";
    }
    info.appendChild(flag);
    
    const name = document.createElement("span");
    name.className = "team-name";
    name.textContent = team ? team.name : "Chờ xác định";
    info.appendChild(name);
    
    row.appendChild(info);
    
    const scoreSpan = document.createElement("span");
    scoreSpan.className = "team-score";
    scoreSpan.textContent = team && score !== null ? score : "-";
    
    if (isPenWinner) {
        const penSpan = document.createElement("span");
        penSpan.className = "penalty-badge";
        penSpan.textContent = `(${penScore})`;
        scoreSpan.appendChild(penSpan);
    }
    
    row.appendChild(scoreSpan);
    
    return row;
}

function getLocalCoords(element, targetParent) {
    let x = 0;
    let y = 0;
    let curr = element;
    while (curr && curr !== targetParent) {
        x += curr.offsetLeft;
        y += curr.offsetTop;
        curr = curr.offsetParent;
    }
    return {
        x: x,
        y: y,
        width: element.offsetWidth,
        height: element.offsetHeight
    };
}

// --- 8. SVG CONNECTORS ---
function drawConnectors() {
    bracketSvg.innerHTML = "";
    
    state.matches.forEach(match => {
        if (match.parentId === null) return;
        
        const cardA = document.querySelector(`[data-match-id="${match.id}"]`);
        const cardB = document.querySelector(`[data-match-id="${match.parentId}"]`);
        
        if (!cardA || !cardB) return;
        
        const coordsA = getLocalCoords(cardA, bracketContent);
        const coordsB = getLocalCoords(cardB, bracketContent);
        
        let x1, y1, x2, y2;
        
        if (match.side === "left") {
            x1 = coordsA.x + coordsA.width;
            y1 = coordsA.y + coordsA.height / 2;
            x2 = coordsB.x;
            y2 = coordsB.y + coordsB.height / 2;
        } else {
            x1 = coordsA.x;
            y1 = coordsA.y + coordsA.height / 2;
            x2 = coordsB.x + coordsB.width;
            y2 = coordsB.y + coordsB.height / 2;
        }
        
        const midX = (x1 + x2) / 2;
        const pathData = `M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2} ${y2}`;
        
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", pathData);
        
        let classStr = "connector-path";
        if (match.status === "live") {
            classStr += " live";
        } else if (match.status === "finished" && match.winnerId) {
            const parentMatch = state.matches[match.parentId];
            if (parentMatch && (parentMatch.homeId === match.winnerId || parentMatch.awayId === match.winnerId)) {
                classStr += " completed";
            }
        }
        
        path.setAttribute("class", classStr);
        bracketSvg.appendChild(path);
    });
}

// --- 9. ZOOM & PAN INTERACTION ---
function initZoomAndPan() {
    bracketViewer.addEventListener("mousedown", (e) => {
        if (e.target.closest(".match-card") || e.target.closest(".zoom-controls") || e.target.closest(".bracket-legend")) return;
        isDragging = true;
        bracketViewer.style.cursor = "grabbing";
        startX = e.clientX - panX;
        startY = e.clientY - panY;
    });

    window.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        panX = e.clientX - startX;
        panY = e.clientY - startY;
        updateTransform();
    });

    window.addEventListener("mouseup", () => {
        isDragging = false;
        bracketViewer.style.cursor = "grab";
    });

    bracketViewer.addEventListener("wheel", (e) => {
        e.preventDefault();
        const zoomFactor = 0.05;
        const oldScale = zoomScale;
        
        if (e.deltaY < 0) {
            zoomScale = Math.min(zoomScale + zoomFactor, 1.5);
        } else {
            zoomScale = Math.max(zoomScale - zoomFactor, 0.25);
        }
        
        const rect = bracketViewer.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        panX = mouseX - (mouseX - panX) * (zoomScale / oldScale);
        panY = mouseY - (mouseY - panY) * (zoomScale / oldScale);
        
        updateTransform();
        drawConnectors();
    });
}

function zoom(factor) {
    const oldScale = zoomScale;
    zoomScale = Math.max(0.25, Math.min(1.5, zoomScale + factor));
    
    const rect = bracketViewer.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    panX = centerX - (centerX - panX) * (zoomScale / oldScale);
    panY = centerY - (centerY - panY) * (zoomScale / oldScale);
    
    updateTransform();
    drawConnectors();
}

function centerBracket() {
    const viewerRect = bracketViewer.getBoundingClientRect();
    zoomScale = viewerRect.width < 768 ? 0.35 : 0.7;
    panX = (viewerRect.width - 2100 * zoomScale) / 2;
    panY = (viewerRect.height - 1100 * zoomScale) / 2;
    updateTransform();
    drawConnectors();
}

function updateTransform() {
    bracketContent.style.transform = `translate(${panX}px, ${panY}px) scale(${zoomScale})`;
}

// --- 10. LEADERBOARDS & STATS UPDATER ---
function updateLeaderboards() {
    // 1. Top scorers
    const scorersArray = Object.keys(state.scorers).map(name => {
        return { name, ...state.scorers[name] };
    }).sort((a, b) => b.goals - a.goals).slice(0, 5);
    
    if (scorersArray.length === 0) {
        topScorersList.innerHTML = '<div class="stats-empty-state">Chưa có bàn thắng nào.</div>';
    } else {
        topScorersList.innerHTML = scorersArray.map((p, idx) => `
            <div class="stats-row">
                <div class="stats-player-left">
                    <span class="stats-rank">#${idx + 1}</span>
                    <img src="https://flagcdn.com/w40/${p.teamCode}.png" class="team-flag" style="width:14px;height:14px">
                    <div>
                        <div class="stats-name">${p.name}</div>
                        <div class="stats-team-name">${TEAMS[p.teamCode]?.name || "Chưa rõ"}</div>
                    </div>
                </div>
                <div class="stats-value-badge">${p.goals} bàn</div>
            </div>
        `).join("");
    }

    // 2. Cards
    const cardsArray = Object.keys(state.cards).map(name => {
        return { name, ...state.cards[name] };
    }).sort((a, b) => (b.red * 3 + b.yellow) - (a.red * 3 + a.yellow)).slice(0, 5);
    
    if (cardsArray.length === 0) {
        cardsLeaderboard.innerHTML = '<div class="stats-empty-state font-small">Chưa có thẻ phạt nào.</div>';
    } else {
        cardsLeaderboard.innerHTML = cardsArray.map((p, idx) => `
            <div class="stats-row ${p.red > 0 ? 'red-card' : 'yellow-card'}">
                <div class="stats-player-left">
                    <span class="stats-rank">#${idx + 1}</span>
                    <img src="https://flagcdn.com/w40/${p.teamCode}.png" class="team-flag" style="width:14px;height:14px">
                    <div>
                        <div class="stats-name">${p.name}</div>
                        <div class="stats-team-name">${TEAMS[p.teamCode]?.name || "Chưa rõ"}</div>
                    </div>
                </div>
                <div class="stats-value-badge">${p.yellow} 🟨 / ${p.red} 🟥</div>
            </div>
        `).join("");
    }

    // 3. Team Goals
    const teamsArray = Object.keys(state.teamGoals).map(code => {
        return { code, goals: state.teamGoals[code] };
    }).sort((a, b) => b.goals - a.goals).slice(0, 5);
    
    if (teamsArray.length === 0) {
        teamsLeaderboard.innerHTML = '<div class="stats-empty-state font-small">Chưa có số liệu đội bóng.</div>';
    } else {
        teamsLeaderboard.innerHTML = teamsArray.map((t, idx) => `
            <div class="stats-row">
                <div class="stats-player-left">
                    <span class="stats-rank">#${idx + 1}</span>
                    <img src="https://flagcdn.com/w40/${t.code}.png" class="team-flag" style="width:14px;height:14px">
                    <span class="stats-name">${TEAMS[t.code]?.name || "Chưa rõ"}</span>
                </div>
                <div class="stats-value-badge">${t.goals} bàn</div>
            </div>
        `).join("");
    }
}

function updateSummaryStats() {
    const finishedMatches = state.matches.filter(m => m.status === 'finished');
    const totalGoals = finishedMatches.reduce((sum, m) => sum + m.scoreHome + m.scoreAway, 0);
    const avgGoals = finishedMatches.length > 0 ? (totalGoals / finishedMatches.length).toFixed(2) : "0.00";
    
    let totalYellow = 0;
    let totalRed = 0;
    Object.values(state.cards).forEach(c => {
        totalYellow += c.yellow;
        totalRed += c.red;
    });

    totalGoalsEl.textContent = totalGoals;
    goalsPerMatchEl.textContent = avgGoals;
    totalYellowCardsEl.textContent = totalYellow;
    totalRedCardsEl.textContent = totalRed;
    
    // Render API updates to timeline log
    renderLiveEventsLog(finishedMatches);
}

function renderLiveEventsLog(finishedMatches) {
    if (finishedMatches.length === 0) {
        liveEventsTicker.innerHTML = `
            <div class="ticker-empty-state">
                <i class="fa-regular fa-bell"></i>
                <p>Không có sự kiện live nào.</p>
            </div>`;
        return;
    }
    
    // Sort matches by API sequence/finished
    const recentMatches = [...finishedMatches].slice(-5).reverse();
    
    liveEventsTicker.innerHTML = recentMatches.map(m => {
        const homeName = TEAMS[m.homeId]?.name || "Chưa rõ";
        const awayName = TEAMS[m.awayId]?.name || "Chưa rõ";
        const winnerName = TEAMS[m.winnerId]?.name || "Chưa rõ";
        
        let scoreText = `${m.scoreHome} - ${m.scoreAway}`;
        if (m.penScoreHome > 0 || m.penScoreAway > 0) {
            scoreText += ` (Pen ${m.penScoreHome}-${m.penScoreAway})`;
        }
        
        return `
            <div class="ticker-item finished">
                [Trận #${m.id + 1}] 🏁 <strong>KẾT THÚC:</strong> <strong>${homeName} ${scoreText} ${awayName}</strong>. <strong>${winnerName}</strong> giành vé đi tiếp!
            </div>
        `;
    }).join("");
}

// --- 11. DETAILED POPUPS & LINEUPS ---
function openMatchModal(matchId) {
    state.selectedMatchId = matchId;
    const match = state.matches[matchId];
    
    document.querySelectorAll(".modal-tab").forEach(b => b.classList.remove("active"));
    document.querySelector("[data-modal-tab='timeline']").classList.add("active");
    document.querySelectorAll(".modal-tab-content").forEach(tc => tc.classList.add("hidden"));
    document.getElementById("modal-tab-timeline").classList.remove("hidden");

    populateMatchModal(match);
    matchModal.classList.add("open");
}

function closeMatchModal() {
    matchModal.classList.remove("open");
    state.selectedMatchId = null;
}

function populateMatchModal(match) {
    const homeTeam = TEAMS[match.homeId];
    const awayTeam = TEAMS[match.awayId];
    
    const roundNames = ["VÒNG 32 ĐỘI", "VÒNG 16 ĐỘI", "TỨ KẾT", "BÁN KẾT", "CHUNG KẾT"];
    modalMatchRound.textContent = match.round === 4 && match.id === 31 ? "TRANH HẠNG BA" : roundNames[match.round];
    modalMatchIdLabel.textContent = `Trận #${match.id + 1}`;

    if (homeTeam) {
        modalFlagHome.src = `https://flagcdn.com/w40/${homeTeam.code}.png`;
        modalFlagHome.style.display = "block";
        modalNameHome.textContent = homeTeam.name;
        modalScoreHome.textContent = match.status === "upcoming" ? "-" : match.scoreHome;
    } else {
        modalFlagHome.style.display = "none";
        modalNameHome.textContent = "Chờ xác định";
        modalScoreHome.textContent = "-";
    }

    if (awayTeam) {
        modalFlagAway.src = `https://flagcdn.com/w40/${awayTeam.code}.png`;
        modalFlagAway.style.display = "block";
        modalNameAway.textContent = awayTeam.name;
        modalScoreAway.textContent = match.status === "upcoming" ? "-" : match.scoreAway;
    } else {
        modalFlagAway.style.display = "none";
        modalNameAway.textContent = "Chờ xác định";
        modalScoreAway.textContent = "-";
    }

    if (match.status === "upcoming") {
        modalMatchTime.textContent = match.time;
        modalMatchStatus.textContent = "CHƯA BẮT ĐẦU";
        modalPenaltyRow.classList.add("hidden");
    } else if (match.status === "live") {
        modalMatchTime.textContent = `${Math.floor(match.minute)}'`;
        modalMatchStatus.textContent = "LIVE";
        modalPenaltyRow.classList.add("hidden");
    } else {
        modalMatchTime.textContent = "FT";
        modalMatchStatus.textContent = "ĐÃ KẾT THÚC";
        
        if (match.penScoreHome > 0 || match.penScoreAway > 0) {
            modalPenaltyRow.classList.remove("hidden");
            modalPenScoreHome.textContent = match.penScoreHome;
            modalPenScoreAway.textContent = match.penScoreAway;
        } else {
            modalPenaltyRow.classList.add("hidden");
        }
    }

    renderTimelineEvents(match);
    renderStatsComparison(match);
    renderPitchLineups(match, homeTeam, awayTeam);
}

function renderTimelineEvents(match) {
    if (match.events.length === 0) {
        modalTimelineEvents.innerHTML = `<div class="timeline-empty">${match.status === "upcoming" ? "Trận đấu chưa bắt đầu." : "Không có sự kiện đáng chú ý."}</div>`;
        return;
    }

    modalTimelineEvents.innerHTML = match.events.map(ev => {
        let typeClass = "goal";
        let icon = '<i class="fa-solid fa-soccer-ball"></i>';
        let content = "";
        
        if (ev.type === "goal") {
            typeClass = "goal";
            icon = '<i class="fa-solid fa-soccer-ball text-success"></i>';
            content = `<strong>Ghi bàn thực tế:</strong> ${ev.player} (${ev.team})`;
        } else if (ev.type === "card-yellow") {
            typeClass = "card-yellow";
            icon = '<i class="fa-solid fa-square-full text-warning" style="transform: rotate(10deg); font-size: 0.75rem;"></i>';
            content = `<strong>Thẻ vàng:</strong> Cảnh cáo ${ev.player} (${ev.team})`;
        } else if (ev.type === "card-red") {
            typeClass = "card-red";
            icon = '<i class="fa-solid fa-square-full text-danger" style="transform: rotate(10deg); font-size: 0.75rem;"></i>';
            content = `<strong>Thẻ đỏ:</strong> ${ev.player} (${ev.team})`;
        } else if (ev.type === "shootout") {
            typeClass = "goal";
            icon = '<i class="fa-solid fa-crosshairs text-warning"></i>';
            content = `<strong>Loạt sút luân lưu:</strong> Kết quả chung cuộc: ${ev.detail}`;
        } else if (ev.type === "FT") {
            typeClass = "sub";
            icon = '<i class="fa-solid fa-flag-checkered text-success"></i>';
            content = `<strong>Kết thúc trận đấu:</strong> ${ev.winner} đi tiếp! Tỉ số: ${ev.score}`;
        }

        return `
            <div class="timeline-event">
                <div class="timeline-dot ${typeClass}"></div>
                <span class="timeline-time">${ev.minute}'</span>
                <span class="timeline-icon">${icon}</span>
                <span class="timeline-text">${content}</span>
            </div>
        `;
    }).join("");
}

function renderStatsComparison(match) {
    if (match.status === "upcoming") {
        modalStatsComparison.innerHTML = '<div class="timeline-empty">Trận đấu chưa bắt đầu. Không có thống kê.</div>';
        return;
    }

    const stats = match.stats;
    const statsList = [
        { name: "Kiểm soát bóng", keyHome: "possessionHome", keyAway: null, unit: "%", isPossession: true },
        { name: "Tổng cú sút", keyHome: "shotsHome", keyAway: "shotsAway" },
        { name: "Sút trúng đích", keyHome: "shotsOnTargetHome", keyAway: "shotsOnTargetAway" },
        { name: "Phạt góc", keyHome: "cornersHome", keyAway: "cornersAway" },
        { name: "Phạm lỗi", keyHome: "foulsHome", keyAway: "foulsAway" },
        { name: "Cứu thua", keyHome: "savesHome", keyAway: "savesAway" }
    ];

    modalStatsComparison.innerHTML = statsList.map(st => {
        let valHome, valAway, pctHome, pctAway;
        
        if (st.isPossession) {
            valHome = stats[st.keyHome];
            valAway = 100 - valHome;
            pctHome = valHome;
            pctAway = valAway;
        } else {
            valHome = stats[st.keyHome];
            valAway = stats[st.keyAway];
            const total = valHome + valAway;
            pctHome = total > 0 ? (valHome / total) * 100 : 50;
            pctAway = total > 0 ? (valAway / total) * 100 : 50;
        }

        return `
            <div class="stat-row-group">
                <div class="stat-row-header">
                    <span>${valHome}${st.unit || ""}</span>
                    <span class="stat-name-center">${st.name}</span>
                    <span>${valAway}${st.unit || ""}</span>
                </div>
                <div class="stat-bar-container">
                    <div class="stat-bar-home" style="width: ${pctHome}%"></div>
                    <div class="stat-bar-away" style="width: ${pctAway}%"></div>
                </div>
            </div>
        `;
    }).join("");
}

function renderPitchLineups(match, homeTeam, awayTeam) {
    const pitchHome = document.getElementById("lineup-home-players");
    const pitchAway = document.getElementById("lineup-away-players");
    
    pitchHome.innerHTML = "";
    pitchAway.innerHTML = "";
    playerListHome.innerHTML = "";
    playerListAway.innerHTML = "";

    if (!homeTeam || !awayTeam) return;

    lineupTitleHome.textContent = `Đội hình: ${homeTeam.name}`;
    lineupTitleAway.textContent = `Đội hình: ${awayTeam.name}`;

    const positions = [
        { y: 8, x: 50 },  // GK
        { y: 22, x: 15 }, // LB
        { y: 22, x: 38 }, // CB1
        { y: 22, x: 62 }, // CB2
        { y: 22, x: 85 }, // RB
        { y: 36, x: 25 }, // LCM
        { y: 38, x: 50 }, // CM
        { y: 36, x: 75 }, // RCM
        { y: 48, x: 20 }, // LW
        { y: 46, x: 50 }, // ST
        { y: 48, x: 80 }  // RW
    ];

    homeTeam.squad.forEach((p, idx) => {
        const pos = positions[idx];
        pitchHome.appendChild(createPlayerBadgeHTML(p, pos));
        
        const li = document.createElement("li");
        li.innerHTML = `<span>#${p.num} ${p.name}</span> <span class="player-pos">${p.pos}</span>`;
        playerListHome.appendChild(li);
    });

    awayTeam.squad.forEach((p, idx) => {
        const pos = positions[idx];
        pitchAway.appendChild(createPlayerBadgeHTML(p, pos));
        
        const li = document.createElement("li");
        li.innerHTML = `<span>#${p.num} ${p.name}</span> <span class="player-pos">${p.pos}</span>`;
        playerListAway.appendChild(li);
    });
}

function createPlayerBadgeHTML(player, pos) {
    const badge = document.createElement("div");
    badge.className = "pitch-player";
    badge.style.top = `${pos.y}%`;
    badge.style.left = `${pos.x}%`;
    badge.textContent = player.num;
    
    const nameSpan = document.createElement("span");
    nameSpan.className = "pitch-player-name";
    nameSpan.textContent = player.name.split(" ").slice(-1)[0];
    badge.appendChild(nameSpan);
    
    return badge;
}

// --- 12. WEB AUDIO API SYNTHESIZER ---
function initAudio() {
    if (audioCtx === null) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") {
        audioCtx.resume();
    }
}

function playSound(type) {
    if (state.isMuted || !audioCtx) return;

    if (type === "refresh") {
        // Quick synthetic success beep
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
        osc.frequency.exponentialRampToValueAtTime(1320, audioCtx.currentTime + 0.15); // E6
        
        gainNode.gain.setValueAtTime(0.001, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
        
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
    }
}
