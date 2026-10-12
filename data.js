/* =========================================================
   ISOKORW — DATA
   Toutes les données du site (produits, vendeurs, catégories…)
========================================================= */

const ISOKO_DATA = {

    /* =========================================================
       CATÉGORIES
    ========================================================= */
    categories: [
        { id: "phones", icon: "📱", name_key: "cat_phones", count: 3200 },
        { id: "electronics", icon: "💻", name_key: "cat_electronics", count: 2750 },
        { id: "fashion", icon: "👕", name_key: "cat_fashion", count: 4100 },
        { id: "vehicles", icon: "🚗", name_key: "cat_vehicles", count: 1380 },
        { id: "real-estate", icon: "🏠", name_key: "cat_real_estate", count: 960 },
        { id: "home", icon: "🛋️", name_key: "cat_home", count: 1540 },
        { id: "gaming", icon: "🎮", name_key: "cat_gaming", count: 880 },
        { id: "books", icon: "📚", name_key: "cat_books", count: 410 },
        { id: "beauty", icon: "💄", name_key: "cat_beauty", count: 720 },
        { id: "services", icon: "🔧", name_key: "cat_services", count: 1050 }
    ],

    /* =========================================================
       VENDEURS
    ========================================================= */
    sellers: [
        {
            id: 1,
            name: "Kigali Electronics",
            avatar: "🏪",
            rating: 4.7,
            reviews_count: 89,
            type_key: "seller_type_electronic",
            location: "Kigali, Gasabo",
            member_since: 2023,
            verified: true,
            listings_count: 120,
            followers: 1240,
            response_time: "~2h"
        },
        {
            id: 2,
            name: "Fashion Hub",
            avatar: "👗",
            rating: 4.6,
            reviews_count: 76,
            type_key: "seller_clothing_store",
            location: "Kigali, Kicukiro",
            member_since: 2023,
            verified: true,
            listings_count: 95,
            followers: 890,
            response_time: "~3h"
        },
        {
            id: 3,
            name: "Auto Deals RW",
            avatar: "🚗",
            rating: 4.8,
            reviews_count: 124,
            type_key: "seller_cars_store",
            location: "Kigali, Nyarugenge",
            member_since: 2022,
            verified: true,
            listings_count: 200,
            followers: 2100,
            response_time: "~1h"
        },
        {
            id: 4,
            name: "Home Essentials",
            avatar: "🏠",
            rating: 4.5,
            reviews_count: 54,
            type_key: "seller_home_store",
            location: "Kigali, Gasabo",
            member_since: 2024,
            verified: true,
            listings_count: 80,
            followers: 420,
            response_time: "~4h"
        }
    ],

    /* =========================================================
       PRODUITS
    ========================================================= */
    products: [
        {
            id: 1,
            title: "iPhone 13 - 128GB",
            category: "phones",
            price: 450000,
            old_price: 500000,
            image: "iphone.jpg",
            images: ["iphone.jpg", "macbook.jpeg", "sofa.jpeg"],
            seller_id: 1,
            location: "Kigali",
            rating: 4.8,
            reviews: 24,
            condition: "new",
            is_new: false,
            is_top_rated: true,
            is_verified: true,
            posted_hours_ago: 2,
            views: 248,
            badge: "-10%",
            description: "Brand new iPhone 13, sealed box with warranty. 128GB storage, Midnight color. Free delivery within Kigali.",
            specs: {
                brand: "Apple",
                model: "iPhone 13",
                storage: "128 GB",
                color: "Midnight",
                display: "6.1\" Super Retina XDR",
                camera: "Dual 12MP · Night mode",
                battery: "Up to 19h video playback",
                chip: "A15 Bionic",
                warranty: "12 months"
            }
        },
        {
            id: 2,
            title: "MacBook Air M1",
            category: "electronics",
            price: 700000,
            old_price: null,
            image: "macbook.jpeg",
            images: ["macbook.jpeg", "iphone.jpg"],
            seller_id: 1,
            location: "Kigali",
            rating: 4.7,
            reviews: 18,
            condition: "new",
            is_new: false,
            is_top_rated: true,
            is_verified: true,
            posted_hours_ago: 5,
            views: 189,
            badge: null,
            description: "MacBook Air M1, perfect condition. 256GB SSD, 8GB RAM. Ideal for work and study.",
            specs: {
                brand: "Apple",
                model: "MacBook Air M1",
                storage: "256 GB",
                color: "Silver",
                display: "13.3\" Retina",
                warranty: "6 months"
            }
        },
        {
            id: 3,
            title: "Nike Air Force 1",
            category: "fashion",
            price: 80000,
            old_price: 94000,
            image: "air force.jpeg",
            images: ["air force.jpeg"],
            seller_id: 2,
            location: "Kigali",
            rating: 4.6,
            reviews: 12,
            condition: "new",
            is_new: true,
            is_top_rated: false,
            is_verified: false,
            posted_hours_ago: 8,
            views: 142,
            badge: "-15%",
            description: "Nike Air Force 1, brand new, all sizes available. Free delivery within Kigali.",
            specs: {
                brand: "Nike",
                model: "Air Force 1",
                color: "White",
                sizes: "38 - 45"
            }
        },
        {
            id: 4,
            title: "Modern Sofa (3 Seater)",
            category: "home",
            price: 250000,
            old_price: null,
            image: "sofa.jpeg",
            images: ["sofa.jpeg"],
            seller_id: 4,
            location: "Kigali",
            rating: 4.5,
            reviews: 9,
            condition: "new",
            is_new: false,
            is_top_rated: false,
            is_verified: true,
            posted_hours_ago: 12,
            views: 198,
            badge: null,
            description: "Modern 3-seater sofa, comfortable and stylish. Perfect for living room.",
            specs: {
                material: "Fabric",
                seats: "3",
                color: "Grey"
            }
        },
        {
            id: 5,
            title: "Toyota RAV4 2020",
            category: "vehicles",
            price: 18000000,
            old_price: null,
            image: "toyota.jpeg",
            images: ["toyota.jpeg"],
            seller_id: 3,
            location: "Kigali",
            rating: 4.7,
            reviews: 15,
            condition: "used",
            is_new: false,
            is_top_rated: true,
            is_verified: true,
            posted_hours_ago: 24,
            views: 542,
            badge: null,
            description: "Toyota RAV4 2020, automatic, petrol. Well maintained, full service history.",
            specs: {
                brand: "Toyota",
                model: "RAV4",
                year: "2020",
                fuel: "Petrol",
                transmission: "Automatic",
                mileage: "45,000 km"
            }
        },
        {
            id: 6,
            title: "iPhone 14 Pro - 256GB",
            category: "phones",
            price: 850000,
            old_price: null,
            image: "iphone.jpg",
            images: ["iphone.jpg"],
            seller_id: 1,
            location: "Kigali",
            rating: 4.9,
            reviews: 5,
            condition: "new",
            is_new: true,
            is_top_rated: false,
            is_verified: true,
            posted_hours_ago: 2,
            views: 87,
            badge: null,
            description: "iPhone 14 Pro, brand new, sealed. 256GB storage, Deep Purple.",
            specs: {
                brand: "Apple",
                model: "iPhone 14 Pro",
                storage: "256 GB",
                color: "Deep Purple"
            }
        },
        {
            id: 7,
            title: "Samsung Galaxy Z Flip 5",
            category: "phones",
            price: 920000,
            old_price: null,
            image: "iphone.jpg",
            images: ["iphone.jpg"],
            seller_id: 1,
            location: "Kigali",
            rating: 4.7,
            reviews: 6,
            condition: "new",
            is_new: true,
            is_top_rated: false,
            is_verified: false,
            posted_hours_ago: 24,
            views: 65,
            badge: null,
            description: "Samsung Galaxy Z Flip 5, foldable phone, brand new with warranty.",
            specs: {
                brand: "Samsung",
                model: "Galaxy Z Flip 5",
                storage: "256 GB"
            }
        },
        {
            id: 8,
            title: "Dell XPS 15 - i7 16GB",
            category: "electronics",
            price: 1250000,
            old_price: null,
            image: "macbook.jpeg",
            images: ["macbook.jpeg"],
            seller_id: 1,
            location: "Kigali",
            rating: 4.8,
            reviews: 3,
            condition: "new",
            is_new: true,
            is_top_rated: true,
            is_verified: true,
            posted_hours_ago: 48,
            views: 112,
            badge: null,
            description: "Dell XPS 15, high performance laptop. Intel i7, 16GB RAM, 512GB SSD.",
            specs: {
                brand: "Dell",
                model: "XPS 15",
                processor: "Intel i7",
                ram: "16 GB",
                storage: "512 GB SSD"
            }
        },
        {
            id: 9,
            title: "Wooden Office Desk",
            category: "home",
            price: 180000,
            old_price: null,
            image: "sofa.jpeg",
            images: ["sofa.jpeg"],
            seller_id: 4,
            location: "Kigali",
            rating: 4.4,
            reviews: 5,
            condition: "new",
            is_new: true,
            is_top_rated: false,
            is_verified: false,
            posted_hours_ago: 72,
            views: 96,
            badge: null,
            description: "Wooden office desk, sturdy and elegant. Perfect for home office.",
            specs: {
                material: "Wood",
                dimensions: "140cm × 70cm × 75cm"
            }
        },
        {
            id: 10,
            title: "Adidas Ultraboost 22",
            category: "fashion",
            price: 110000,
            old_price: null,
            image: "air force.jpeg",
            images: ["air force.jpeg"],
            seller_id: 2,
            location: "Kigali",
            rating: 4.3,
            reviews: 2,
            condition: "new",
            is_new: true,
            is_top_rated: false,
            is_verified: false,
            posted_hours_ago: 8,
            views: 58,
            badge: null,
            description: "Adidas Ultraboost 22, running shoes, brand new.",
            specs: {
                brand: "Adidas",
                model: "Ultraboost 22",
                sizes: "39 - 46"
            }
        }
    ],

    /* =========================================================
       MESSAGES (conversations)
    ========================================================= */
    conversations: [
        {
            id: 1,
            contact_name: "Jean Paul",
            avatar: "J",
            avatar_color: "#F4B400",
            last_message: "Is the iPhone 13 still available?",
            last_message_time: "5m",
            unread: 1,
            type: "selling",
            product_id: 1
        },
        {
            id: 2,
            contact_name: "Marie K.",
            avatar: "M",
            avatar_color: "#0B5FA5",
            last_message: "Hi, can you deliver to Huye?",
            last_message_time: "1h",
            unread: 1,
            type: "selling",
            product_id: 1
        },
        {
            id: 3,
            contact_name: "Eric N.",
            avatar: "E",
            avatar_color: "#16A86B",
            last_message: "What's the lowest price for the MacBook?",
            last_message_time: "2h",
            unread: 1,
            type: "buying",
            product_id: 2
        },
        {
            id: 4,
            contact_name: "Aline M.",
            avatar: "A",
            avatar_color: "#E5484D",
            last_message: "Thanks, received the package. Great seller!",
            last_message_time: "Yesterday",
            unread: 0,
            type: "selling",
            product_id: 1
        },
        {
            id: 5,
            contact_name: "Patrick R.",
            avatar: "P",
            avatar_color: "#10233F",
            last_message: "Can we meet tomorrow at 3pm?",
            last_message_time: "2d",
            unread: 0,
            type: "buying",
            product_id: 5
        },
        {
            id: 6,
            contact_name: "Sophie B.",
            avatar: "S",
            avatar_color: "#D69A00",
            last_message: "I'm interested in the Nike Air Force 1",
            last_message_time: "3d",
            unread: 0,
            type: "selling",
            product_id: 3
        }
    ]
};