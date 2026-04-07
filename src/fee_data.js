// Finance Act 2023 - Nairobi County Pest Control Fee Schedule
// Source: Finance Act 2023 Pest Control NAICS Implementation Guideline
const FEE_SCHEDULE = {
  "1000 GENERAL TRADERS SHOPS AND RETAIL SERVICES": [
    {
      "premise": "Hyper – Supermarket: over 100 employees/over 5000 sq.m",
      "fees": {
        "pestControl": 3000,
        "fumigation": 20000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 0,
        "ipmVendor": 0,
        "total": 47500
      }
    },
    {
      "premise": "Mega – supermarkets: 76 – 100 employees/ 4001 – 5000 sq.m",
      "fees": {
        "pestControl": 2000,
        "fumigation": 16000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 41000
      }
    },
    {
      "premise": "Large Supermarket: 51-75 employees/ 3001 – 4000 sq. m. m/prime location",
      "fees": {
        "pestControl": 1500,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 35750
      }
    },
    {
      "premise": "Medium Supermarket:21-50 employees/2001-3000 sq.m",
      "fees": {
        "pestControl": 1000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 30500
      }
    },
    {
      "premise": "Small Supermarket:1-20 employees/Upto-2000 sq.m",
      "fees": {
        "pestControl": 500,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 1250,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 25250
      }
    },
    {
      "premise": "Hyper – Non Food: over 100 employees/over 5000 sq.m",
      "fees": {
        "pestControl": 3000,
        "fumigation": 20000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 312.5,
        "ipmVendor": 937.5,
        "total": 47500
      }
    },
    {
      "premise": "Mega – Non Food: 76 – 100 employees/ 4001 – 5000 sq.m",
      "fees": {
        "pestControl": 2000,
        "fumigation": 16000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 41000
      }
    },
    {
      "premise": "Large  – Non Food: 51-75 employees/ 3001 – 4000 sq. m. m/prime location",
      "fees": {
        "pestControl": 1500,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 35750
      }
    },
    {
      "premise": "Medium – Non Food:21-50 employees/2001-3000 sq.m",
      "fees": {
        "pestControl": 1000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 30500
      }
    },
    {
      "premise": "Small  – Non Food:1-20 employees/Upto-2000 sq.m",
      "fees": {
        "pestControl": 500,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 1250,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 25250
      }
    },
    {
      "premise": "Large butchery shop or retail service: over 5 employees/over 30sq.m",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 312.5,
        "ipmVendor": 937.5,
        "total": 39500
      }
    },
    {
      "premise": "Medium butchery shop or retail service: 3-5 employees/5-30sq.m",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 33000
      }
    },
    {
      "premise": "Small butchery shop or retail service: upto 2 employees/less than 5sq.m",
      "fees": {
        "pestControl": 1000,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 26500
      }
    },
    {
      "premise": "Large trader shop/Agency  or retail service: over 5 employees/over 300sq.m",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 39500
      }
    },
    {
      "premise": "Medium trader shop/Agency retail service: 3-5 employees/50-300sq.m",
      "fees": {
        "pestControl": 1000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 30500
      }
    },
    {
      "premise": "Small trader shop/Agency or retail service: upto 2 employees/less than 50sq.m",
      "fees": {
        "pestControl": 500,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 1250,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 25250
      }
    },
    {
      "premise": "Large Non Food trader shop/Agency  or retail service: over 5 employees/over 300sq.m",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 312.5,
        "ipmVendor": 937.5,
        "total": 39500
      }
    },
    {
      "premise": "Medium  Non Food trader shop/Agency retail service: 3-5 employees/50-300sq.m",
      "fees": {
        "pestControl": 1000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 30500
      }
    },
    {
      "premise": "Small  Non Food trader shop/Agency or retail service: upto 2 employees/less than 50sq.m",
      "fees": {
        "pestControl": 500,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 1250,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 25250
      }
    },
    {
      "premise": "Kiosk: Light or temporary construction less than  5sq.m",
      "fees": {
        "pestControl": 500,
        "fumigation": 0,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 1250,
        "ipmNccg": 312.5,
        "ipmVendor": 937.5,
        "total": 21250
      }
    },
    {
      "premise": "All shops and retail services in Nairobi City County owned Markets",
      "fees": {
        "pestControl": 500,
        "fumigation": 0,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 1250,
        "ipmNccg": 312.5,
        "ipmVendor": 937.5,
        "total": 21250
      }
    },
    {
      "premise": "All non food shops and retail services in Nairobi City County owned Markets",
      "fees": {
        "pestControl": 500,
        "fumigation": 0,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 1250,
        "ipmNccg": 312.5,
        "ipmVendor": 937.5,
        "total": 21250
      }
    },
    {
      "premise": "Hyper - Chemist/Pharmacy",
      "fees": {
        "pestControl": 3000,
        "fumigation": 20000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 312.5,
        "ipmVendor": 937.5,
        "total": 47500
      }
    },
    {
      "premise": "Mega - Chemist/Pharmacy",
      "fees": {
        "pestControl": 2000,
        "fumigation": 16000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 41000
      }
    },
    {
      "premise": "Large - Chemist/Pharmacy",
      "fees": {
        "pestControl": 1500,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 35750
      }
    },
    {
      "premise": "Medium - Chemist/Pharmacy",
      "fees": {
        "pestControl": 1000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 30500
      }
    },
    {
      "premise": "Small - Chemist/Pharmacy",
      "fees": {
        "pestControl": 500,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 1250,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 25250
      }
    },
    {
      "premise": "Hyper - Distributor",
      "fees": {
        "pestControl": 3000,
        "fumigation": 20000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 312.5,
        "ipmVendor": 937.5,
        "total": 47500
      }
    },
    {
      "premise": "Mega - Distributor",
      "fees": {
        "pestControl": 2000,
        "fumigation": 16000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 41000
      }
    },
    {
      "premise": "Large - Distributor",
      "fees": {
        "pestControl": 1500,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 35750
      }
    },
    {
      "premise": "Medium - Distributor",
      "fees": {
        "pestControl": 1000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 30500
      }
    },
    {
      "premise": "Small - Distributor",
      "fees": {
        "pestControl": 500,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 1250,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 25250
      }
    },
    {
      "premise": "Hyper - Wholesaler",
      "fees": {
        "pestControl": 3000,
        "fumigation": 20000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 312.5,
        "ipmVendor": 937.5,
        "total": 47500
      }
    },
    {
      "premise": "Mega - Wholesaler",
      "fees": {
        "pestControl": 2000,
        "fumigation": 16000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 41000
      }
    },
    {
      "premise": "Large - Wholesaler",
      "fees": {
        "pestControl": 1500,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 35750
      }
    },
    {
      "premise": "Medium - Wholesaler",
      "fees": {
        "pestControl": 1000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 30500
      }
    },
    {
      "premise": "Small - Wholesaler",
      "fees": {
        "pestControl": 500,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 1250,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 25250
      }
    },
    {
      "premise": "Hyper - Wholesaler-Non Food",
      "fees": {
        "pestControl": 3000,
        "fumigation": 20000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 312.5,
        "ipmVendor": 937.5,
        "total": 47500
      }
    },
    {
      "premise": "Mega - Wholesaler-Non Food",
      "fees": {
        "pestControl": 2000,
        "fumigation": 16000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 41000
      }
    },
    {
      "premise": "Large - Wholesaler-Non Food",
      "fees": {
        "pestControl": 1500,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 35750
      }
    },
    {
      "premise": "Medium - Wholesaler-Non Food",
      "fees": {
        "pestControl": 1000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 30500
      }
    },
    {
      "premise": "Small - Wholesaler-Non Food",
      "fees": {
        "pestControl": 500,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 1250,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 25250
      }
    },
    {
      "premise": "Hyper - Wines and Spirits",
      "fees": {
        "pestControl": 500,
        "fumigation": 20000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 1250,
        "ipmNccg": 312.5,
        "ipmVendor": 937.5,
        "total": 41250
      }
    },
    {
      "premise": "Mega - Wines and Spirits",
      "fees": {
        "pestControl": 2000,
        "fumigation": 16000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 312.5,
        "ipmVendor": 937.5,
        "total": 41000
      }
    },
    {
      "premise": "Large - Wines and Spirits",
      "fees": {
        "pestControl": 1500,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 35750
      }
    },
    {
      "premise": "Medium - Wines and Spirits",
      "fees": {
        "pestControl": 1000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 30500
      }
    },
    {
      "premise": "Small - Wines and Spirits 6-20 employees/ 501-2000 sq.m",
      "fees": {
        "pestControl": 500,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 1250,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 25250
      }
    },
    {
      "premise": "Mini - Wines and Spirits upto 5 employees/upto 500 sq.m",
      "fees": {
        "pestControl": 500,
        "fumigation": 2000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 1250,
        "ipmNccg": 312.5,
        "ipmVendor": 937.5,
        "total": 23250
      }
    },
    {
      "premise": "Hyper - Soda Distributor",
      "fees": {
        "pestControl": 3000,
        "fumigation": 20000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 312.5,
        "ipmVendor": 937.5,
        "total": 47500
      }
    },
    {
      "premise": "Mega - Soda Distributor",
      "fees": {
        "pestControl": 2000,
        "fumigation": 16000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 41000
      }
    },
    {
      "premise": "Large - Soda Distributor",
      "fees": {
        "pestControl": 1500,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 35750
      }
    },
    {
      "premise": "Medium - Soda Distributor",
      "fees": {
        "pestControl": 1000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 30500
      }
    },
    {
      "premise": "Small - Soda Distributor",
      "fees": {
        "pestControl": 500,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 1250,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 25250
      }
    },
    {
      "premise": "Food Kiosk: Light or temporary construction less than  5sq.m",
      "fees": {
        "pestControl": 500,
        "fumigation": 0,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 1250,
        "ipmNccg": 312.5,
        "ipmVendor": 937.5,
        "total": 21250
      }
    }
  ],
  "2000 INFORMAL SECTOR": [
    {
      "premise": "1 hawker with motor vehicle (food)",
      "fees": {
        "pestControl": 0,
        "fumigation": 0,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 0,
        "ipmNccg": 0,
        "ipmVendor": 0,
        "total": 20000
      }
    },
    {
      "premise": "1 hawker with motor vehicle (non-food)",
      "fees": {
        "pestControl": 0,
        "fumigation": 0,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 0,
        "ipmNccg": 0,
        "ipmVendor": 0,
        "total": 20000
      }
    },
    {
      "premise": "1 hawker without motor vehicle (food)",
      "fees": {
        "pestControl": 0,
        "fumigation": 0,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 0,
        "ipmNccg": 0,
        "ipmVendor": 0,
        "total": 20000
      }
    },
    {
      "premise": "1 hawker without motor vehicle (non-food)",
      "fees": {
        "pestControl": 0,
        "fumigation": 0,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 0,
        "ipmNccg": 0,
        "ipmVendor": 0,
        "total": 20000
      }
    },
    {
      "premise": "Small informal sector trader / service provider e.g. shoe shiner,shoe repairer, street vendor (non-food)",
      "fees": {
        "pestControl": 0,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 0,
        "ipmNccg": 0,
        "ipmVendor": 0,
        "total": 24000
      }
    },
    {
      "premise": "Small informal sector trader / service provider/ street vendor (soda, sweets,Cigarettes etc.)",
      "fees": {
        "pestControl": 0,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 0,
        "ipmNccg": 0,
        "ipmVendor": 0,
        "total": 24000
      }
    },
    {
      "premise": "Semi-permanent informal sector trader: up to 2 persons in verandah or temporary building(newspapers & book sellers)",
      "fees": {
        "pestControl": 0,
        "fumigation": 0,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 0,
        "ipmNccg": 0,
        "ipmVendor": 0,
        "total": 20000
      }
    }
  ],
  "300 TRANSPORT, STORAGE AND COMMUNICATIONS": [
    {
      "premise": "Large Transport Company: with over 10 aeroplanes/International Airlines",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 0,
        "ipmVendor": 0,
        "total": 39500
      }
    },
    {
      "premise": "Medium Transport Company: with 6-10 aeroplanes",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 33000
      }
    },
    {
      "premise": "Small- Transportation Company: with up to 5 aeroplanes",
      "fees": {
        "pestControl": 1500,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 27750
      }
    },
    {
      "premise": "Mega Transport Company: with over 100 vehicles",
      "fees": {
        "pestControl": 3000,
        "fumigation": 16000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 43500
      }
    },
    {
      "premise": "Large Transport Company: with 51-100 vehicles",
      "fees": {
        "pestControl": 2000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 37000
      }
    },
    {
      "premise": "Medium Transport Company: with 31-50 vehicles",
      "fees": {
        "pestControl": 1500,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 31750
      }
    },
    {
      "premise": "Small Transportation Company: with 6-30 vehicles",
      "fees": {
        "pestControl": 1000,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 26500
      }
    },
    {
      "premise": "Mini- Transportation Company: with 2 to 5 vehicles",
      "fees": {
        "pestControl": 500,
        "fumigation": 2000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 1250,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 23250
      }
    },
    {
      "premise": "Independent  Transport Operator: with 1 vehicle 1Taxi & without an office",
      "fees": {
        "pestControl": 0,
        "fumigation": 0,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 0,
        "ipmNccg": 312.5,
        "ipmVendor": 937.5,
        "total": 20000
      }
    },
    {
      "premise": "Public transport vehicle 33no and above passangers",
      "fees": {
        "pestControl": 0,
        "fumigation": 0,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 0,
        "ipmNccg": 0,
        "ipmVendor": 0,
        "total": 20000
      }
    },
    {
      "premise": "Public transport vehicle 19no - 32no passangers",
      "fees": {
        "pestControl": 0,
        "fumigation": 0,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 0,
        "ipmNccg": 0,
        "ipmVendor": 0,
        "total": 20000
      }
    },
    {
      "premise": "Public transport vehicle 15no -18no passangers",
      "fees": {
        "pestControl": 0,
        "fumigation": 0,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 0,
        "ipmNccg": 0,
        "ipmVendor": 0,
        "total": 20000
      }
    },
    {
      "premise": "Public transport vehicle below 14no passangers",
      "fees": {
        "pestControl": 0,
        "fumigation": 0,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 0,
        "ipmNccg": 0,
        "ipmVendor": 0,
        "total": 20000
      }
    },
    {
      "premise": "Large filling station: over 10 pump Nozzles or with garage/workshop and spares retail shop",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 0,
        "ipmVendor": 0,
        "total": 39500
      }
    },
    {
      "premise": "Medium filling station: 6-10 pump Nozzles or with garage / workshop or spares retail shop",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 33000
      }
    },
    {
      "premise": "Small filling station: 3-5 pump Nozzles and without garage/workshop or retail shop",
      "fees": {
        "pestControl": 1500,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 27750
      }
    },
    {
      "premise": "Mini filling station: Up to 2 pump Nozzles and without garage/workshop or retail shop",
      "fees": {
        "pestControl": 1000,
        "fumigation": 2000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 24500
      }
    },
    {
      "premise": "Gas filling depot",
      "fees": {
        "pestControl": 500,
        "fumigation": 0,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 1250,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 21250
      }
    },
    {
      "premise": "Large Fuel Dispensers with over 4 dispensers",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 312.5,
        "ipmVendor": 937.5,
        "total": 39500
      }
    },
    {
      "premise": "Medium Fuel Dispensers with 2 - 3 dispensers",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 33000
      }
    },
    {
      "premise": "Small Fuel Dispenser with 1 dispenser",
      "fees": {
        "pestControl": 1000,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 26500
      }
    },
    {
      "premise": "Large Cooking Gas with over 4 dispensers",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 39500
      }
    },
    {
      "premise": "Medium Cooking Gas with 2 - 3 dispensers",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 33000
      }
    },
    {
      "premise": "Small Cooking Gas with 1 dispenser",
      "fees": {
        "pestControl": 1000,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 26500
      }
    },
    {
      "premise": "Large Milk Dispensers with over 4 dispensers",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 39500
      }
    },
    {
      "premise": "Medium Milk Dispensers with 2 - 3 dispensers",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 33000
      }
    },
    {
      "premise": "Small Milk Dispenser with 1 dispenser",
      "fees": {
        "pestControl": 1000,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 26500
      }
    },
    {
      "premise": "Large Water Dispensers with over 4 dispensers",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 39500
      }
    },
    {
      "premise": "Medium Water Dispensers with 2 - 3 dispensers",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 33000
      }
    },
    {
      "premise": "Small Water Dispenser with 1 dispenser",
      "fees": {
        "pestControl": 1000,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 26500
      }
    },
    {
      "premise": "Large Car Gas Refilling Station with over 10 nozzles",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 39500
      }
    },
    {
      "premise": "Medium Car Gas Refilling station with 6 - 10 nozzles",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 33000
      }
    },
    {
      "premise": "Small Car Gas Refilling Station with 3 - 5 nozzles",
      "fees": {
        "pestControl": 1000,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 26500
      }
    },
    {
      "premise": "Mini Car Gas Refilling Station with up to 2 nozzles",
      "fees": {
        "pestControl": 1000,
        "fumigation": 2000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 24500
      }
    },
    {
      "premise": "Large Electric Vehicle Charging Station with over 10 Charging Ports",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 39500
      }
    },
    {
      "premise": "Medium Electric Vehicle Charging Stations with 6 - 10 Charging Ports",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 33000
      }
    },
    {
      "premise": "Small Electric Vehicle Charging Station with 3 - 5 Charging Ports",
      "fees": {
        "pestControl": 1000,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 26500
      }
    },
    {
      "premise": "Mini Electric Vehicle Charging Station with up to 2 Charging Ports",
      "fees": {
        "pestControl": 1000,
        "fumigation": 2000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 24500
      }
    },
    {
      "premise": "Large food cold storage facility: over 1000sq. m",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 39500
      }
    },
    {
      "premise": "Large non-food cold storage facility: over 1000sq. m",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 39500
      }
    },
    {
      "premise": "Medium food cold storage facility: from 101-1,000sq. m",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 33000
      }
    },
    {
      "premise": "Small food cold storage facility: up to 100sq. m",
      "fees": {
        "pestControl": 1000,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 26500
      }
    },
    {
      "premise": "Large food storage facility: over 3000 sq. m Go down/warehouse liquid storage tanks complex",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 39500
      }
    },
    {
      "premise": "Large non-food storage facility: over 3000 sq. m Go down/warehouse liquid storage tanks complex",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 39500
      }
    },
    {
      "premise": "Medium food storage facility: from 2001 – 3000sq. m",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 33000
      }
    },
    {
      "premise": "Medium non-food storage facility: from 2001 – 3000sq. m",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 33000
      }
    },
    {
      "premise": "Small Food Storage Facility: From 1001 - 2000 Sq.m",
      "fees": {
        "pestControl": 500,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 1250,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 25250
      }
    },
    {
      "premise": "Small Non-Food Storage Facility: From 1001 - 2000 Sq.m",
      "fees": {
        "pestControl": 500,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 1250,
        "ipmNccg": 312.5,
        "ipmVendor": 937.5,
        "total": 25250
      }
    },
    {
      "premise": "Mini food storage facility up to 1000sq. m",
      "fees": {
        "pestControl": 1000,
        "fumigation": 2000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 312.5,
        "ipmVendor": 937.5,
        "total": 24500
      }
    },
    {
      "premise": "Mini non-food storage facility up to 1000sq. m",
      "fees": {
        "pestControl": 1000,
        "fumigation": 2000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 24500
      }
    },
    {
      "premise": "Large private vehicles parking capacity: over 100 vehicles",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 39500
      }
    },
    {
      "premise": "Medium private vehicles parking: capacity 51-100 vehicles",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 33000
      }
    },
    {
      "premise": "Small private vehicles parking capacity: 1-50 vehicles",
      "fees": {
        "pestControl": 1500,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 27750
      }
    },
    {
      "premise": "Hyper communications company: over 100 employees &/or premises over 1500sq. m",
      "fees": {
        "pestControl": 1000,
        "fumigation": 20000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 42500
      }
    },
    {
      "premise": "Mega  communications company: 61-100 employees &/ or premises of 1001-1500sq. m",
      "fees": {
        "pestControl": 500,
        "fumigation": 16000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 1250,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 37250
      }
    },
    {
      "premise": "Large communications company: 41-60 employees or premises of 501-1000sq. m",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 312.5,
        "ipmVendor": 937.5,
        "total": 39500
      }
    },
    {
      "premise": "Medium communications company: 21-40 employees & / or premises of 301-500sq. m",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 33000
      }
    },
    {
      "premise": "Small communications company: 6-20 employees &/or upto 300 sq.m",
      "fees": {
        "pestControl": 1500,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 27750
      }
    },
    {
      "premise": "Mini communication company: Up to employees 5",
      "fees": {
        "pestControl": 1000,
        "fumigation": 2000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 24500
      }
    },
    {
      "premise": "Large Transport Network Companies (Uber, Taxify, Little Cab etc) capacity over 100 vehicles",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 39500
      }
    },
    {
      "premise": "Medium Transport Network Companies (Uber, Taxify, Little Cab): Capacity 51-100 vehicles",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 33000
      }
    },
    {
      "premise": "Small Transport Network Companies (Uber, Taxify, Little Cab etc): Capacity 1-50 vehicles",
      "fees": {
        "pestControl": 1000,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 26500
      }
    },
    {
      "premise": "LPG Dealers Large scale (above 50 cylinders)",
      "fees": {
        "pestControl": 3000,
        "fumigation": 0,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 27500
      }
    },
    {
      "premise": "LPG Dealers Medium (20-50)",
      "fees": {
        "pestControl": 2000,
        "fumigation": 0,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 25000
      }
    },
    {
      "premise": "LPG Dealers Small (10-20)",
      "fees": {
        "pestControl": 1000,
        "fumigation": 0,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 22500
      }
    }
  ],
  "4000 AGRICULTURE FORESTRY AND NATURAL RESOURCES": [
    {
      "premise": "Mega agriculture producer, processor, dealer, exporter with over 60 employees",
      "fees": {
        "pestControl": 3000,
        "fumigation": 16000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 0,
        "ipmVendor": 0,
        "total": 43500
      }
    },
    {
      "premise": "Large agriculture producer, processor, dealer, exporter with 36-60 employees",
      "fees": {
        "pestControl": 2000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 37000
      }
    },
    {
      "premise": "Medium agricultural producer, processor, dealer, exporter with 11-35 employees",
      "fees": {
        "pestControl": 1500,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 31750
      }
    },
    {
      "premise": "Small agricultural producer, processor, dealer, exporter with 4-10 employees(Commercial Boreholes)",
      "fees": {
        "pestControl": 1000,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 26500
      }
    },
    {
      "premise": "Mini agricultural producer, processor, dealer, exporter with up to 3 employees",
      "fees": {
        "pestControl": 500,
        "fumigation": 2000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 1250,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 23250
      }
    },
    {
      "premise": "Mega Commercial coffee millers with over 10000 Metric Tons USD 2000",
      "fees": {
        "pestControl": 3000,
        "fumigation": 16000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 312.5,
        "ipmVendor": 937.5,
        "total": 43500
      }
    },
    {
      "premise": "Large Commercial coffee millers with 5001 -  10000 Metric Tons USD 1000",
      "fees": {
        "pestControl": 2000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 37000
      }
    },
    {
      "premise": "Medium Commercial coffee millers with 3001 - 5000 Metric Tons USD 750",
      "fees": {
        "pestControl": 1500,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 31750
      }
    },
    {
      "premise": "Small Commercial coffee millers up to 3000 Metric Tons USD 500",
      "fees": {
        "pestControl": 1000,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 26500
      }
    },
    {
      "premise": "Mega Coffee Rosters with over 1000 bags",
      "fees": {
        "pestControl": 3000,
        "fumigation": 16000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 43500
      }
    },
    {
      "premise": "Large Coffee Rosters with 501 - 1000 bags",
      "fees": {
        "pestControl": 2000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 37000
      }
    },
    {
      "premise": "Medium Coffee Rosters with 101 - 500 bags",
      "fees": {
        "pestControl": 1500,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 31750
      }
    },
    {
      "premise": "Small Coffee Rosters with up to 100 bags",
      "fees": {
        "pestControl": 1000,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 26500
      }
    },
    {
      "premise": "Commercial coffee Warehouse with over 200000 bags 1000USD",
      "fees": {
        "pestControl": 3000,
        "fumigation": 0,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 27500
      }
    },
    {
      "premise": "Commercial coffee Warehouse with 100001 - 200000 bags 1000USD",
      "fees": {
        "pestControl": 2000,
        "fumigation": 0,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 25000
      }
    },
    {
      "premise": "Commercial coffee Warehouse with up to 100000 bags 750USD",
      "fees": {
        "pestControl": 1500,
        "fumigation": 0,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 23750
      }
    },
    {
      "premise": "Large – Space>=2.5ha/throughput – No of animals slaughtered per day >=40 heads of cattle + 200 sheep and goats per day",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 39500
      }
    },
    {
      "premise": "Medium – Space>=0.5ha<=2.49/throughput – No of animals slaughtered per day >= 6-39 heads of cattle + 100 - 199 sheep and goats per day",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 33000
      }
    },
    {
      "premise": "Small – Space<0.5/throughput – No of animals slaughtered per day <= 5 heads of cattle + <100 sheep and goats per day",
      "fees": {
        "pestControl": 1500,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 27750
      }
    },
    {
      "premise": "Large mining or natural resources extraction operation with over 50 employees",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 39500
      }
    },
    {
      "premise": "Medium Mining or Natural Resources Extraction operation with 4-50 employees",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 33000
      }
    },
    {
      "premise": "Small Mining or Natural Resources Extraction operation with 1-3 employees",
      "fees": {
        "pestControl": 500,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 1250,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 25250
      }
    },
    {
      "premise": "Mini agricultural, forestry and natural resources exploitation: 1 person acting individually",
      "fees": {
        "pestControl": 1000,
        "fumigation": 2000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 312.5,
        "ipmVendor": 937.5,
        "total": 24500
      }
    }
  ],
  "5000 ACCOMMODATION AND CATERING": [
    {
      "premise": "Large fully serviced and furnished apartments with over 10 apartments/ABNBs",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 0,
        "ipmVendor": 0,
        "total": 39500
      }
    },
    {
      "premise": "Medium fully serviced and furnished apartments with 6-10 apartments/ABNBs",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 33000
      }
    },
    {
      "premise": "Small fully serviced and furnished apartments with 3-5 apartments/ABNBs",
      "fees": {
        "pestControl": 1500,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 27750
      }
    },
    {
      "premise": "Mini fully serviced and furnished apartments with 1-2 apartments/ABNBs",
      "fees": {
        "pestControl": 3000,
        "fumigation": 2000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 29500
      }
    },
    {
      "premise": "Large high standards hotel/accommodation facility with over 100 rooms",
      "fees": {
        "pestControl": 2000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 37000
      }
    },
    {
      "premise": "Medium high standards hotel /accommodation facility with over 41 - 100 rooms",
      "fees": {
        "pestControl": 1500,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 31750
      }
    },
    {
      "premise": "Small high standards hotel / accommodation facility with upto 40 rooms",
      "fees": {
        "pestControl": 1000,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 26500
      }
    },
    {
      "premise": "Large lodging house with restaurant or bar with over 15 rooms",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 39500
      }
    },
    {
      "premise": "Medium lodging house with restaurant or bar with 6-15 rooms",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 33000
      }
    },
    {
      "premise": "Small lodging house with restaurant or bar with upto 5 rooms",
      "fees": {
        "pestControl": 1500,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 27750
      }
    },
    {
      "premise": "Large lodging house with over 15 rooms",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 39500
      }
    },
    {
      "premise": "Medium Lodging house with 6 to 15 rooms",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 33000
      }
    },
    {
      "premise": "Small lodging house with up to 5 rooms",
      "fees": {
        "pestControl": 1000,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 26500
      }
    },
    {
      "premise": "Hyper  restaurant with bar with over 100 seats",
      "fees": {
        "pestControl": 3000,
        "fumigation": 20000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 47500
      }
    },
    {
      "premise": "Mega restaurant with bar with 71-100 seats",
      "fees": {
        "pestControl": 2000,
        "fumigation": 16000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 41000
      }
    },
    {
      "premise": "Large restaurant with bar with 31-70 seats",
      "fees": {
        "pestControl": 2000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 37000
      }
    },
    {
      "premise": "Medium restaurant with bar 11to 30 seats",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 33000
      }
    },
    {
      "premise": "Small restaurant with bar up to 10 seats",
      "fees": {
        "pestControl": 1000,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 26500
      }
    },
    {
      "premise": "Mega eating house/snack bar/ tea house with no lodging or alcohol served with over 50 Seats",
      "fees": {
        "pestControl": 3000,
        "fumigation": 16000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 43500
      }
    },
    {
      "premise": "Large eating house/snack bar/tea house with no lodging or alcohol served with 21-50 Seats",
      "fees": {
        "pestControl": 2000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 37000
      }
    },
    {
      "premise": "Medium eating house: snack bar/tea house with no lodging or alcohol served: 6-20 Seats",
      "fees": {
        "pestControl": 1500,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 31750
      }
    },
    {
      "premise": "Small eating house, snack bar/tea house with no lodging or alcohol served up to 5 Seats",
      "fees": {
        "pestControl": 1000,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 26500
      }
    },
    {
      "premise": "Large outside catering services with over 5 employees",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 39500
      }
    },
    {
      "premise": "Medium outside Catering Services with 3 to 5 emplyees",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 33000
      }
    },
    {
      "premise": "Small outside Catering Services with up to 2 employees",
      "fees": {
        "pestControl": 1500,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 27750
      }
    },
    {
      "premise": "Mega food trucks of Triple Axle Group (12 wheels-dual tyres and above)",
      "fees": {
        "pestControl": 2000,
        "fumigation": 16000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 41000
      }
    },
    {
      "premise": "Large food trucks of Tandem Axle Group (8 - 10 wheels- dual tyres)",
      "fees": {
        "pestControl": 1500,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 35750
      }
    },
    {
      "premise": "Medium food trucks of Single Axle (4 - 6 wheels fitted with dual tyres)",
      "fees": {
        "pestControl": 1000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 30500
      }
    },
    {
      "premise": "Small food trucks of Single Steering Axle (2 wheels fitted with single tyres)",
      "fees": {
        "pestControl": 1000,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 26500
      }
    },
    {
      "premise": "Large bar/traditional beer seller: over 50 Seats",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 39500
      }
    },
    {
      "premise": "Medium bar/traditional beer seller: 16-50 Seats",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 33000
      }
    },
    {
      "premise": "Small bar/traditional beer seller: up to 15 Seats",
      "fees": {
        "pestControl": 1500,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 27750
      }
    },
    {
      "premise": "Large night club with over 50 seats",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 39500
      }
    },
    {
      "premise": "Medium night club 16 - 50 seats",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 33000
      }
    },
    {
      "premise": "Small night club with upto 15 seats",
      "fees": {
        "pestControl": 1500,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 27750
      }
    },
    {
      "premise": "Large Commercial kitchen with over 20 employees",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 39500
      }
    },
    {
      "premise": "Medium Commercial kitchen with between 5 - 20 employees",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 33000
      }
    },
    {
      "premise": "Small commercial kitchen with upto 4 employees",
      "fees": {
        "pestControl": 1500,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 27750
      }
    },
    {
      "premise": "Large Non Commercial kitchen with over 20 employees",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 39500
      }
    },
    {
      "premise": "Medium Non Commercial kitchen with between 5 - 20 employees",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 33000
      }
    },
    {
      "premise": "Small Non commercial kitchen with upto 4 employees",
      "fees": {
        "pestControl": 1500,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 27750
      }
    }
  ],
  "6000 PROFESSIONAL, TECHNICAL AND FINANCIAL SERVICES": [
    {
      "premise": "Mega professional services firm with over 100 employees/ professionals. Technicians guards etc.",
      "fees": {
        "pestControl": 3000,
        "fumigation": 16000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 0,
        "ipmVendor": 0,
        "total": 43500
      }
    },
    {
      "premise": "Large professional services firm with 51- 100 employees/ professionals. Technicians guards etc.",
      "fees": {
        "pestControl": 2000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 37000
      }
    },
    {
      "premise": "Medium professional services firm with over 21-50 employees/ professional/ technicians/ guards etc.",
      "fees": {
        "pestControl": 1500,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 31750
      }
    },
    {
      "premise": "Small professional services firm with 6-20 employees/professionals/technicians/guards etc.",
      "fees": {
        "pestControl": 1000,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 26500
      }
    },
    {
      "premise": "Mini professional services firm with 1-5 employees/ professionals. Technicians guards etc.",
      "fees": {
        "pestControl": 500,
        "fumigation": 2000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 1250,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 23250
      }
    },
    {
      "premise": "Large financial services including Saccos and co-operative societies with over 25 employees",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 312.5,
        "ipmVendor": 937.5,
        "total": 39500
      }
    },
    {
      "premise": "Medium financial services including Saccos and co-operative societies with 6-25 employees",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 33000
      }
    },
    {
      "premise": "Small financial  services including Saccos and co-operative societies with up to 5 employees",
      "fees": {
        "pestControl": 1500,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 27750
      }
    },
    {
      "premise": "Mini financial services including financial consultants/ creditors/ loans on assets firms with no money accounts / 1 person acting individually etc",
      "fees": {
        "pestControl": 500,
        "fumigation": 2000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 1250,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 23250
      }
    },
    {
      "premise": "Large financial agent and M-pesa over 5 outlets",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 312.5,
        "ipmVendor": 937.5,
        "total": 39500
      }
    },
    {
      "premise": "Medium financial agent and M-pesa with 2-5 outlets",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 33000
      }
    },
    {
      "premise": "Small financial agent and M-pesa upto 1 outlet",
      "fees": {
        "pestControl": 1500,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 27750
      }
    },
    {
      "premise": "Money points : above 5 ATMs. Money machines separate from branch/office",
      "fees": {
        "pestControl": 500,
        "fumigation": 0,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 1250,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 21250
      }
    },
    {
      "premise": "Money points : 3 - 5 ATMs. Money machines separate from branch/office",
      "fees": {
        "pestControl": 500,
        "fumigation": 0,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 1250,
        "ipmNccg": 312.5,
        "ipmVendor": 937.5,
        "total": 21250
      }
    },
    {
      "premise": "Money points : up to 2 ATMs. Money machines separate from branch/office",
      "fees": {
        "pestControl": 500,
        "fumigation": 0,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 1250,
        "ipmNccg": 312.5,
        "ipmVendor": 937.5,
        "total": 21250
      }
    },
    {
      "premise": "Large cyber cafes/bureau with over 20 computers/machines",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 312.5,
        "ipmVendor": 937.5,
        "total": 39500
      }
    },
    {
      "premise": "Medium Cyber Cafes/bureau with 6-20 computer/ machines",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 33000
      }
    },
    {
      "premise": "Small Cyber Cafes/ bureau with 1-5 computer/machines",
      "fees": {
        "pestControl": 1500,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 27750
      }
    },
    {
      "premise": "Large private markets with over 1,000sq.m",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 39500
      }
    },
    {
      "premise": "Medium private markets with from 501-1,000sq.m",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 33000
      }
    },
    {
      "premise": "Small private markets with upto 500sq.m",
      "fees": {
        "pestControl": 1000,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 26500
      }
    }
  ],
  "7000 PRIVATE EDUCATION, HEALTH AND ENTERTAINMENT": [
    {
      "premise": "Large private higher education institutions; any type of private university college or higher education institution with over 200 students.",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 0,
        "ipmVendor": 0,
        "total": 39500
      }
    },
    {
      "premise": "Medium Private higher education institutions; any type of private university college or higher education institution with 100-200 students",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 33000
      }
    },
    {
      "premise": "Small Private higher education institutions; any type of private university college or higher education institution with Upto100 students",
      "fees": {
        "pestControl": 1500,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 27750
      }
    },
    {
      "premise": "Larger private education institutions ; nursery, primary and secondary schools with over 100 pupils",
      "fees": {
        "pestControl": 2000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 37000
      }
    },
    {
      "premise": "Medium  private education institutions; nursery, primary and secondary schools with 31- 100 pupils",
      "fees": {
        "pestControl": 1500,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 31750
      }
    },
    {
      "premise": "Small private education institutions; nursery, primary and secondary schools with 16 - 30 pupils",
      "fees": {
        "pestControl": 1000,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 26500
      }
    },
    {
      "premise": "Mini private education institutions; Day care, nursery, primary and secondary schools with up to 15  pupils",
      "fees": {
        "pestControl": 500,
        "fumigation": 2000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 1250,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 23250
      }
    },
    {
      "premise": "Large complementary education institutions over 350 pupils",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 312.5,
        "ipmVendor": 937.5,
        "total": 39500
      }
    },
    {
      "premise": "Medium complementary education institutions 201-350 pupils",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 33000
      }
    },
    {
      "premise": "Small complementary education institutions 1-200 pupils",
      "fees": {
        "pestControl": 1500,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 27750
      }
    },
    {
      "premise": "Large Private Health Facility -  Level 6 Hospitals with over 100 beds overnight",
      "fees": {
        "pestControl": 2000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 37000
      }
    },
    {
      "premise": "Medium Private Health Facility - Level 4 & 5 hospitals with 31 - 100 beds",
      "fees": {
        "pestControl": 1500,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 31750
      }
    },
    {
      "premise": "Small Private Health Facility -  Level 3 hospitals with up to 30 beds",
      "fees": {
        "pestControl": 1000,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 26500
      }
    },
    {
      "premise": "Mini Private Health Facility -  Level 2 hospitals / dental / medical /eye clinics",
      "fees": {
        "pestControl": 500,
        "fumigation": 2000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 1250,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 23250
      }
    },
    {
      "premise": "Mini Private Health Facility -  Professionals",
      "fees": {
        "pestControl": 500,
        "fumigation": 2000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 1250,
        "ipmNccg": 312.5,
        "ipmVendor": 937.5,
        "total": 23250
      }
    },
    {
      "premise": "Small Private Ambulance Services Company",
      "fees": {
        "pestControl": 500,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 1250,
        "ipmNccg": 312.5,
        "ipmVendor": 937.5,
        "total": 25250
      }
    },
    {
      "premise": "Mini Private Ambulance Services Company",
      "fees": {
        "pestControl": 500,
        "fumigation": 2000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 1250,
        "ipmNccg": 312.5,
        "ipmVendor": 937.5,
        "total": 23250
      }
    },
    {
      "premise": "Large  Private Ambulance Services Company",
      "fees": {
        "pestControl": 500,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 1250,
        "ipmNccg": 312.5,
        "ipmVendor": 937.5,
        "total": 33250
      }
    },
    {
      "premise": "Private Ambulance Vehicle",
      "fees": {
        "pestControl": 500,
        "fumigation": 0,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 1250,
        "ipmNccg": 312.5,
        "ipmVendor": 937.5,
        "total": 21250
      }
    },
    {
      "premise": "Large Private Mortuary with over 30 bodies",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 312.5,
        "ipmVendor": 937.5,
        "total": 39500
      }
    },
    {
      "premise": "Medium Private Mortuary with 16 - 30 bodies",
      "fees": {
        "pestControl": 3000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 35500
      }
    },
    {
      "premise": "Small Private Mortuary with up to 15 bodies",
      "fees": {
        "pestControl": 1000,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 26500
      }
    },
    {
      "premise": "Mini Traditional Health Services; Herbalist / Traditional Healer / Supplements",
      "fees": {
        "pestControl": 3000,
        "fumigation": 2000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 29500
      }
    },
    {
      "premise": "Public Toilets/biodigesters/septic tanks",
      "fees": {
        "pestControl": 500,
        "fumigation": 0,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 1250,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 21250
      }
    },
    {
      "premise": "Mobile Toilets above 50",
      "fees": {
        "pestControl": 3000,
        "fumigation": 0,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 312.5,
        "ipmVendor": 937.5,
        "total": 27500
      }
    },
    {
      "premise": "Mobile Toilets 21-50",
      "fees": {
        "pestControl": 2000,
        "fumigation": 0,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 25000
      }
    },
    {
      "premise": "Mobile Toilets 11-20",
      "fees": {
        "pestControl": 1000,
        "fumigation": 0,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 22500
      }
    },
    {
      "premise": "Mobile Toilets 1-10",
      "fees": {
        "pestControl": 500,
        "fumigation": 0,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 1250,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 21250
      }
    },
    {
      "premise": "Large entertainment facility; cinema / theatre / video show/ bowling with over 100seats",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 312.5,
        "ipmVendor": 937.5,
        "total": 39500
      }
    },
    {
      "premise": "Medium entertainment facility cinema / theatre / video show/ bowling with 51-100 seats",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 33000
      }
    },
    {
      "premise": "Small entertainment facility cinema / theatre / video show/ bowling with upto 50 seats",
      "fees": {
        "pestControl": 1500,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 27750
      }
    },
    {
      "premise": "Large entertainment facility; amusement arcade/ games machines arcade with over 10 machines",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 39500
      }
    },
    {
      "premise": "Medium entertainment facility amusement arcade/ games machines arcade with 4-10 machines",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 33000
      }
    },
    {
      "premise": "Small entertainment facility amusement arcade/ games machines arcade with upto 3 machines",
      "fees": {
        "pestControl": 1500,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 27750
      }
    },
    {
      "premise": "Large sport club/gym with over 50 members",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 39500
      }
    },
    {
      "premise": "Medium sport club/gym with 16 - 50 members",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 33000
      }
    },
    {
      "premise": "Small sport club/gym facility with upto 15 members",
      "fees": {
        "pestControl": 1500,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 27750
      }
    },
    {
      "premise": "Large entertainment machines with over 5 play stations",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 39500
      }
    },
    {
      "premise": "Medium entertainment machines with 3- 5 play stations",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 33000
      }
    },
    {
      "premise": "Small entertainment machines with upto 2 play stations",
      "fees": {
        "pestControl": 1500,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 27750
      }
    },
    {
      "premise": "Large entertainment machines with over 5 pool tables",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 39500
      }
    },
    {
      "premise": "Medium entertainment machines with 3- 5 pool tables",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 33000
      }
    },
    {
      "premise": "Small entertainment machines with upto 2 pool tables",
      "fees": {
        "pestControl": 1500,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 27750
      }
    },
    {
      "premise": "Large Massage parlour with over 5 beds",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 39500
      }
    },
    {
      "premise": "Medium Massage parlour with 3- 5 beds",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 33000
      }
    },
    {
      "premise": "Small Massage parlour with upto 2 beds",
      "fees": {
        "pestControl": 1500,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 27750
      }
    },
    {
      "premise": "Large casino over 1000sq. m",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 39500
      }
    },
    {
      "premise": "Medium casino 501-1000sq. m",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 33000
      }
    },
    {
      "premise": "Small casino upto 500sq. m",
      "fees": {
        "pestControl": 1500,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 3750,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 27750
      }
    },
    {
      "premise": "Betting shops",
      "fees": {
        "pestControl": 3000,
        "fumigation": 0,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 937.5,
        "ipmVendor": 2812.5,
        "total": 27500
      }
    },
    {
      "premise": "Totalizer premises",
      "fees": {
        "pestControl": 3000,
        "fumigation": 0,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 27500
      }
    }
  ],
  "8000 INDUSTRIAL PLANTS, FACTORIES, WORKSHOPS, CONTRACTORS": [
    {
      "premise": "Large food industrial plant with over 100 employees",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 0,
        "ipmVendor": 0,
        "total": 39500
      }
    },
    {
      "premise": "Medium food industrial plant with over 51-100 employees",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 33000
      }
    },
    {
      "premise": "Small food industrial plant with over 16-50 employees",
      "fees": {
        "pestControl": 1000,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 26500
      }
    },
    {
      "premise": "Mini food industrial plant with 1 – 15 employees",
      "fees": {
        "pestControl": 500,
        "fumigation": 2000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 1250,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 23250
      }
    },
    {
      "premise": "Large non-food industrial plant with over 100 employees",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 312.5,
        "ipmVendor": 937.5,
        "total": 39500
      }
    },
    {
      "premise": "Medium non-food industrial plant with over 51-100 employees",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 33000
      }
    },
    {
      "premise": "Small non-food industrial plant with over 16-50 employees",
      "fees": {
        "pestControl": 1000,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 26500
      }
    },
    {
      "premise": "Mini non-food industrial plant with 1 – 15 employees",
      "fees": {
        "pestControl": 500,
        "fumigation": 2000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 1250,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 23250
      }
    },
    {
      "premise": "Mega workshop / service / repair contractor with over 100 employees",
      "fees": {
        "pestControl": 3000,
        "fumigation": 16000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 312.5,
        "ipmVendor": 937.5,
        "total": 43500
      }
    },
    {
      "premise": "Large workshop / service / repair contractor with 51-100 employees",
      "fees": {
        "pestControl": 3000,
        "fumigation": 12000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 39500
      }
    },
    {
      "premise": "Medium workshop / service / repair contractor with 21--50 employees",
      "fees": {
        "pestControl": 2000,
        "fumigation": 8000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 5000,
        "ipmNccg": 1875,
        "ipmVendor": 5625,
        "total": 33000
      }
    },
    {
      "premise": "Small workshop / service / repair contractor with 6-20 employees",
      "fees": {
        "pestControl": 1000,
        "fumigation": 4000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 2500,
        "ipmNccg": 1250,
        "ipmVendor": 3750,
        "total": 26500
      }
    },
    {
      "premise": "Mini workshop / factory / contractor/posho mill/printers with Up to 5  employees",
      "fees": {
        "pestControl": 3000,
        "fumigation": 2000,
        "termites": 5000,
        "snakes": 10000,
        "rodents": 5000,
        "ipmAudit": 7500,
        "ipmNccg": 625,
        "ipmVendor": 1875,
        "total": 29500
      }
    }
  ]
};
