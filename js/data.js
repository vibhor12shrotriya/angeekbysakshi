/* ═══════════════════════════════════════════
   DATA.JS — Seed data and constants
   Angeek By Sakshi · Studio Billing System
   In production: replace with API/DB calls
═══════════════════════════════════════════ */

const STUDIO = {
  name:    'Angeek By Sakshi',
  tagline: 'Premium Lehenga & Indo-Western Collection',
  address: 'Udaipur, Rajasthan',
  phone:   '+91 91169 63601',
  email:   'angeekbysakshi@gmail.com',
  invoicePrefix: 'INV',
  invoiceYear:   '2026',
  nextInvoiceNum: 45,
  gstEnabled: false,
  gstin:    '',
  gstRate:  12,
  returnPolicy: 'Items must be returned by the agreed date in original condition. Late returns will incur the late fee specified in the invoice. Security deposit is refundable after satisfactory inspection of the returned outfit.'
};

// ── Seed inventory ──────────────────────────
const SEED_INVENTORY = [
  { id:'I001', code:'L-022', name:'Bridal Lehenga Set',      category:'Lehenga',      type:'both', size:'M',  rentPrice:8000,  salePrice:75000, status:'rented' },
  { id:'I002', code:'L-015', name:'Designer Lehenga',        category:'Lehenga',      type:'rent', size:'S',  rentPrice:6000,  salePrice:null,  status:'rented' },
  { id:'I003', code:'IW-07', name:'Anarkali Suit Set',       category:'Indo-Western', type:'sale', size:'L',  rentPrice:null,  salePrice:45000, status:'sold'   },
  { id:'I004', code:'L-031', name:'Heavy Bridal Lehenga',    category:'Lehenga',      type:'both', size:'XL', rentPrice:10000, salePrice:90000, status:'available' },
  { id:'I005', code:'IW-12', name:'Embroidered Sharara',     category:'Indo-Western', type:'both', size:'M',  rentPrice:5000,  salePrice:32000, status:'available' },
  { id:'I006', code:'L-009', name:'Pastel Lehenga Choli',    category:'Lehenga',      type:'rent', size:'S',  rentPrice:4500,  salePrice:null,  status:'available' },
  { id:'I007', code:'L-041', name:'Mint Georgette Lehenga',  category:'Lehenga',      type:'both', size:'M',  rentPrice:3800,  salePrice:28000, status:'available' },
  { id:'I008', code:'IW-18', name:'Navy Palazzo Set',        category:'Indo-Western', type:'rent', size:'L',  rentPrice:3200,  salePrice:null,  status:'available' },
  { id:'I009', code:'L-055', name:'Teal Silk Lehenga',       category:'Lehenga',      type:'both', size:'XL', rentPrice:7000,  salePrice:55000, status:'available' },
  { id:'I010', code:'IW-23', name:'Cream Sharara Set',       category:'Indo-Western', type:'sale', size:'S',  rentPrice:null,  salePrice:22000, status:'available' },
];

// ── Seed customers ──────────────────────────
const SEED_CUSTOMERS = [
  { id:'C001', name:'Priya Sharma',  mobile:'9876543210', address:'Sector 14, Gurugram', since:'2024-01-15' },
  { id:'C002', name:'Anjali Mehta',  mobile:'9823456789', address:'DLF Phase 2, Gurugram', since:'2024-03-20' },
  { id:'C003', name:'Simran Kaur',   mobile:'9123478901', address:'Sushant Lok, Gurugram', since:'2025-02-10' },
  { id:'C004', name:'Pooja Verma',   mobile:'9087654321', address:'Palam Vihar, Gurugram', since:'2023-12-05' },
  { id:'C005', name:'Nita Bhatia',   mobile:'9765432109', address:'South City, Gurugram', since:'2024-06-18' },
  { id:'C006', name:'Divya Nair',    mobile:'9654321098', address:'Sohna Road, Gurugram', since:'2024-09-02' },
  { id:'C007', name:'Reena Gupta',   mobile:'9543210987', address:'MG Road, Gurugram',    since:'2025-01-25' },
];

// ── Seed invoices ───────────────────────────
const SEED_INVOICES = [
  {
    id:'INV001', number:'INV-2025-044', type:'rent',
    customerId:'C003', customerName:'Simran Kaur', customerMobile:'9123478901',
    outfitCode:'L-022', outfitName:'Bridal Lehenga Set', inventoryId:'I001',
    rentAmount:8000, deposit:10000, lateFeePerDay:300,
    salePrice:null, discount:0, discountType:'flat',
    rentFrom:'2025-03-21', rentTo:'2025-03-28',
    paymentMode:'cash', amountPaid:12000, depositRefunded:false,
    status:'partial', returnStatus:'active',
    createdAt:'2025-03-21', notes:'Handle with care — dupatta is heavy'
  },
  {
    id:'INV002', number:'INV-2025-043', type:'sale',
    customerId:'C004', customerName:'Pooja Verma', customerMobile:'9087654321',
    outfitCode:'IW-07', outfitName:'Anarkali Suit Set', inventoryId:'I003',
    rentAmount:null, deposit:0, lateFeePerDay:0,
    salePrice:45000, discount:2000, discountType:'flat',
    rentFrom:null, rentTo:null,
    paymentMode:'upi', amountPaid:43000, depositRefunded:false,
    status:'paid', returnStatus:'na',
    createdAt:'2025-03-20', notes:''
  },
  {
    id:'INV003', number:'INV-2025-042', type:'rent',
    customerId:'C001', customerName:'Priya Sharma', customerMobile:'9876543210',
    outfitCode:'L-015', outfitName:'Designer Lehenga', inventoryId:'I002',
    rentAmount:6000, deposit:8000, lateFeePerDay:200,
    salePrice:null, discount:0, discountType:'flat',
    rentFrom:'2025-03-15', rentTo:'2025-03-19',
    paymentMode:'cash', amountPaid:14000, depositRefunded:false,
    status:'paid', returnStatus:'overdue',
    createdAt:'2025-03-15', notes:''
  },
  {
    id:'INV004', number:'INV-2025-041', type:'rent',
    customerId:'C002', customerName:'Anjali Mehta', customerMobile:'9823456789',
    outfitCode:'IW-18', outfitName:'Navy Palazzo Set', inventoryId:'I008',
    rentAmount:4000, deposit:6000, lateFeePerDay:150,
    salePrice:null, discount:0, discountType:'flat',
    rentFrom:'2025-03-18', rentTo:'2025-03-21',
    paymentMode:'cash', amountPaid:10000, depositRefunded:false,
    status:'paid', returnStatus:'due-today',
    createdAt:'2025-03-18', notes:''
  },
  {
    id:'INV005', number:'INV-2025-040', type:'sale',
    customerId:'C005', customerName:'Nita Bhatia', customerMobile:'9765432109',
    outfitCode:'L-031', outfitName:'Heavy Bridal Lehenga', inventoryId:'I004',
    rentAmount:null, deposit:0, lateFeePerDay:0,
    salePrice:38000, discount:5, discountType:'pct',
    rentFrom:null, rentTo:null,
    paymentMode:'bank', amountPaid:36100, depositRefunded:false,
    status:'paid', returnStatus:'na',
    createdAt:'2025-03-17', notes:'Alteration done — waist size adjusted'
  },
  {
    id:'INV006', number:'INV-2025-039', type:'sale',
    customerId:'C006', customerName:'Divya Nair', customerMobile:'9654321098',
    outfitCode:'IW-12', outfitName:'Embroidered Sharara', inventoryId:'I005',
    rentAmount:null, deposit:0, lateFeePerDay:0,
    salePrice:28500, discount:0, discountType:'flat',
    rentFrom:null, rentTo:null,
    paymentMode:'upi', amountPaid:28500, depositRefunded:false,
    status:'paid', returnStatus:'na',
    createdAt:'2025-03-15', notes:''
  },
  {
    id:'INV007', number:'INV-2025-037', type:'rent',
    customerId:'C007', customerName:'Reena Gupta', customerMobile:'9543210987',
    outfitCode:'L-055', outfitName:'Teal Silk Lehenga', inventoryId:'I009',
    rentAmount:7000, deposit:12000, lateFeePerDay:250,
    salePrice:null, discount:0, discountType:'flat',
    rentFrom:'2025-03-24', rentTo:'2025-03-28',
    paymentMode:'upi', amountPaid:7000, depositRefunded:false,
    status:'partial', returnStatus:'upcoming',
    createdAt:'2025-03-14', notes:''
  },
];

// ── Seed payments ───────────────────────────
const SEED_PAYMENTS = [
  { id:'P001', invoiceId:'INV001', invoiceNumber:'INV-2025-044', customerName:'Simran Kaur',  amount:12000, mode:'cash', date:'2025-03-21', note:'Advance paid' },
  { id:'P002', invoiceId:'INV002', invoiceNumber:'INV-2025-043', customerName:'Pooja Verma',  amount:43000, mode:'upi',  date:'2025-03-20', note:'Full payment' },
  { id:'P003', invoiceId:'INV003', invoiceNumber:'INV-2025-042', customerName:'Priya Sharma', amount:14000, mode:'cash', date:'2025-03-15', note:'' },
  { id:'P004', invoiceId:'INV004', invoiceNumber:'INV-2025-041', customerName:'Anjali Mehta', amount:10000, mode:'cash', date:'2025-03-18', note:'' },
  { id:'P005', invoiceId:'INV005', invoiceNumber:'INV-2025-040', customerName:'Nita Bhatia',  amount:36100, mode:'bank', date:'2025-03-17', note:'Bank NEFT' },
  { id:'P006', invoiceId:'INV006', invoiceNumber:'INV-2025-039', customerName:'Divya Nair',   amount:28500, mode:'upi',  date:'2025-03-15', note:'' },
  { id:'P007', invoiceId:'INV007', invoiceNumber:'INV-2025-037', customerName:'Reena Gupta',  amount:7000,  mode:'upi',  date:'2025-03-14', note:'Advance' },
];

// ── Payment modes ───────────────────────────
const PAYMENT_MODES = [
  { value:'cash', label:'Cash' },
  { value:'upi',  label:'UPI' },
  { value:'bank', label:'Bank Transfer' },
  { value:'mixed',label:'Mixed' },
];

// ── Category / type options ──────────────────
const CATEGORIES = ['Lehenga', 'Indo-Western', 'Other'];
const ITEM_TYPES  = ['rent', 'sale', 'both'];
const SIZES       = ['XS', 'S', 'M', 'L', 'XL', 'Custom'];
