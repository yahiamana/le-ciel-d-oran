import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import * as bcrypt from 'bcryptjs'
import 'dotenv/config'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  // Clear existing data to prevent duplicates on re-seed
  await prisma.dish.deleteMany()
  await prisma.category.deleteMany()
  await prisma.galleryItem.deleteMany()
  await prisma.setting.deleteMany()
  await prisma.adminUser.deleteMany()

  // 1. Create Default Admin User
  const hashedPassword = await bcrypt.hash('admin123', 10)
  await prisma.adminUser.create({
    data: {
      email: 'admin@cieldoran.com',
      password: hashedPassword,
    },
  })
  console.log('✅ Created default admin user')

  // 2. Base Settings
  await prisma.setting.createMany({
    data: [
      { key: 'phone', value: '055 12 34 567' },
      { key: 'address', value: 'Rue Example, Oran' },
      { key: 'hours', value: 'Lun–Sam : 12:00 – 23:00' },
      { key: 'instagram', value: 'https://instagram.com/lecieldoran' },
      { key: 'facebook', value: 'https://facebook.com/lecieldoran' },
      { key: 'whatsapp', value: 'https://wa.me/213551234567' }
    ]
  })
  console.log('✅ Created settings')

  // 3. Gallery Items
  await prisma.galleryItem.createMany({
    data: [
      { order: 1, alt: "Salle élégante du restaurant le soir", src: "/gallery/gallery_interior_1_1772808169282.png" },
      { order: 2, alt: "Loup de mer, émulsion citronnelle", src: "/gallery/gallery_dish_1_1772808093803.png" },
      { order: 3, alt: "Terrasse avec vue sur la ville", src: "/gallery/gallery_interior_2_1772808284179.png" },
      { order: 4, alt: "Tartare de thon à l'avocat", src: "/gallery/gallery_dish_2_1772808133346.png" },
      { order: 5, alt: "Entremet chocolat miroir", src: "/gallery/gallery_dessert_1772808258403.png" },
      { order: 6, alt: "Velouté de courge rôtie et espuma safran", src: "/gallery/gallery_dish_3_1772808225407.png" }
    ]
  })
  console.log('✅ Created gallery items')

  // 4. Menu Categories and Dishes
  const catEntrees = await prisma.category.create({
    data: {
      titleFr: "Entrées",
      titleAr: "مقبلات",
      order: 1,
      dishes: {
        create: [
          { order: 1, nameFr: "Tartare de thon à l'avocat", nameAr: "تارتار تونة مع أفوكادو", description: "Thon frais coupé en brunoise, avocat mûr, sésame torréfié et ponzu maison.", price: "1 200 DZD" },
          { order: 2, nameFr: "Velouté de courge rôtie, espuma au safran", nameAr: "شوربة قرع محمصة مع رغوة الزعفران", description: "Courge butternut rôtie, légère espuma de safran iranien, huile de noisette.", price: "900 DZD" },
          { order: 3, nameFr: "Salade d'agrumes, fenouil et burrata", nameAr: "سلطة الحمضيات مع البوراتا", description: "Orange sanguine, pamplemousse, fenouil croquant, burrata crémeuse, vinaigrette miel-citron.", price: "1 050 DZD" }
        ]
      }
    }
  })

  const catPlats = await prisma.category.create({
    data: {
      titleFr: "Plats principaux",
      titleAr: "أطباق رئيسية",
      order: 2,
      dishes: {
        create: [
          { order: 1, nameFr: "Filet de loup de mer, émulsion citronnelle", nameAr: "فيليه سمك القِبّالة مع رغوة السترونيلا", description: "Bar de ligne cuit sur peau, émulsion de lemongrass, légumes de saison glacés.", price: "2 800 DZD" },
          { order: 2, nameFr: "Magret de canard, purée truffée, sauce porto", nameAr: "صدر بطة مع بيوريه الترفل وصلصة بورتو", description: "Magret rosé, purée de pomme de terre à la truffe noire, jus réduit au porto.", price: "3 200 DZD" },
          { order: 3, nameFr: "Risotto aux champignons sauvages", nameAr: "ريزوتّو بالفطر والبارميزان", description: "Arborio crémeux, cèpes et girolles, copeaux de parmigiano reggiano 24 mois.", price: "2 200 DZD" }
        ]
      }
    }
  })

  const catDesserts = await prisma.category.create({
    data: {
      titleFr: "Desserts",
      titleAr: "حلويات",
      order: 3,
      dishes: {
        create: [
          { order: 1, nameFr: "Millefeuille vanille Bourbon", nameAr: "ميلفوي بالفانيلا", description: "Feuilletage caramélisé, crème légère à la vanille de Madagascar.", price: "950 DZD" },
          { order: 2, nameFr: "Entremet chocolat 64%", nameAr: "حلوى الشوكولاتة ٦٤٪", description: "Mousse aérienne au chocolat noir, biscuit praliné, glaçage miroir.", price: "900 DZD" }
        ]
      }
    }
  })

  const catBoissons = await prisma.category.create({
    data: {
      titleFr: "Boissons & Vins",
      titleAr: "مشروبات ونبيذ",
      order: 4,
      dishes: {
        create: [
          { order: 1, nameFr: "Carte des vins locale", nameAr: "قائمة نبيذ محلية وعالمية", description: "Sélection de crus algériens, français, italiens et du nouveau monde.", price: "dès 2 500 DZD" },
          { order: 2, nameFr: "Cocktails signatures", nameAr: "كوكتيلات مميزة", description: "Création du barman avec des ingrédients frais et de saison.", price: "800–1 200 DZD" }
        ]
      }
    }
  })

  console.log('✅ Created menu categories and dishes')
  console.log('Seeding finished successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('SEED ERROR:')
    console.error('Message:', e.message)
    console.error('Code:', e.code)
    console.error('Stack:', e.stack)
    await prisma.$disconnect()
    process.exit(1)
  })
