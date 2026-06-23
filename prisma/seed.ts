import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const Role = { ADMIN: "ADMIN", TECHNICIAN: "TECHNICIAN" } as const;
const JobStatus = {
  SCHEDULED: "SCHEDULED", ON_THE_WAY: "ON_THE_WAY", IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED", CANCELLED: "CANCELLED",
} as const;
const InvoiceStatus = { PAID: "PAID", PENDING: "PENDING", OVERDUE: "OVERDUE" } as const;

const prisma = new PrismaClient();

async function main() {
  // Clean slate (order matters for foreign keys)
  await prisma.appointment.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.expense.deleteMany();
  await prisma.job.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.user.deleteMany();

  const pass = await bcrypt.hash("password123", 10);

  // Admin
  const admin = await prisma.user.create({
    data: {
      name: "Ahmed Al Mansoori",
      email: "admin@osta.ae",
      password: pass,
      role: Role.ADMIN,
      title: "Administrator",
      phone: "+971 50 123 4567",
    },
  });

  // Technicians
  const techData = [
    { name: "Rashid Ali", email: "rashid@osta.ae", title: "Senior AC Technician" },
    { name: "Muhammad Imran", email: "imran@osta.ae", title: "AC Technician" },
    { name: "Faisal Khan", email: "faisal@osta.ae", title: "Installation Specialist" },
    { name: "Asif Mahmood", email: "asif@osta.ae", title: "Maintenance Technician" },
    { name: "Bilal Ahmed", email: "bilal@osta.ae", title: "AC Technician" },
  ];
  const techs = [];
  for (const t of techData) {
    techs.push(
      await prisma.user.create({
        data: { ...t, password: pass, role: Role.TECHNICIAN, phone: "+971 55 000 0000" },
      })
    );
  }

  // Customers
  const custData = [
    { name: "John Smith", phone: "+971 50 111 1111", address: "Downtown, Dubai" },
    { name: "Sara Al Zaabi", phone: "+971 50 222 2222", address: "Jumeirah, Dubai" },
    { name: "Green House LLC", phone: "+971 4 333 3333", address: "Business Bay, Dubai" },
    { name: "Ahmed Raza", phone: "+971 50 444 4444", address: "Marina, Dubai" },
    { name: "Fatima Hassan", phone: "+971 50 555 5555", address: "Deira, Dubai" },
    { name: "Emirates Trading", phone: "+971 4 666 6666", address: "Al Quoz, Dubai" },
  ];
  const customers = [];
  for (const c of custData) {
    customers.push(await prisma.customer.create({ data: c }));
  }

  const services = ["AC Maintenance", "AC Repair", "AC Installation", "Duct Cleaning", "Gas Refilling"];
  const statuses = [
    JobStatus.ON_THE_WAY,
    JobStatus.IN_PROGRESS,
    JobStatus.COMPLETED,
    JobStatus.SCHEDULED,
    JobStatus.SCHEDULED,
  ];

  // Jobs
  for (let i = 0; i < 12; i++) {
    const cust = customers[i % customers.length];
    const tech = techs[i % techs.length];
    await prisma.job.create({
      data: {
        jobNumber: `JOB-2024-${String(19 - i).padStart(3, "0")}`,
        service: services[i % services.length],
        status: statuses[i % statuses.length],
        amount: [450, 300, 1250, 350, 250][i % 5],
        scheduledAt: new Date(Date.now() + (i - 3) * 86400000),
        customerId: cust.id,
        technicianId: tech.id,
      },
    });
  }

  // Invoices
  const invRows = [
    { num: "1057", cust: 0, amount: 3850, status: InvoiceStatus.PAID },
    { num: "1056", cust: 1, amount: 7200, status: InvoiceStatus.PENDING },
    { num: "1055", cust: 5, amount: 12500, status: InvoiceStatus.PAID },
    { num: "1054", cust: 2, amount: 4600, status: InvoiceStatus.PENDING },
    { num: "1053", cust: 3, amount: 2800, status: InvoiceStatus.PAID },
  ];
  for (const r of invRows) {
    await prisma.invoice.create({
      data: {
        invoiceNumber: `INV-2024-${r.num}`,
        amount: r.amount,
        status: r.status,
        customerId: customers[r.cust].id,
      },
    });
  }

  // Demo customer user (front-end login) linked to the first customer
  const customerUser = await prisma.user.create({
    data: {
      name: "John Smith",
      email: "customer@osta.ae",
      password: pass,
      role: "CUSTOMER",
      phone: "+971 50 111 1111",
    },
  });
  await prisma.customer.update({
    where: { id: customers[0].id },
    data: { userId: customerUser.id, email: "customer@osta.ae" },
  });

  // Appointments for the demo customer
  await prisma.appointment.create({
    data: {
      service: "AC Maintenance",
      status: "CONFIRMED",
      scheduledAt: new Date(Date.now() + 2 * 86400000),
      address: "Downtown, Dubai",
      phone: "+971 50 111 1111",
      customerId: customers[0].id,
    },
  });
  await prisma.appointment.create({
    data: {
      service: "AC Repair",
      status: "PENDING",
      scheduledAt: new Date(Date.now() + 5 * 86400000),
      address: "Downtown, Dubai",
      phone: "+971 50 111 1111",
      customerId: customers[0].id,
    },
  });

  // Expenses
  const expRows = [
    { title: "Fuel expense", category: "Transport", amount: 250 },
    { title: "AC spare parts", category: "Parts", amount: 1800 },
    { title: "Tools purchase", category: "Equipment", amount: 950 },
    { title: "Office supplies", category: "Office", amount: 320 },
    { title: "Vehicle maintenance", category: "Transport", amount: 600 },
  ];
  for (const e of expRows) {
    await prisma.expense.create({
      data: { ...e, createdById: admin.id },
    });
  }

  console.log("Seed complete.");
  console.log("Admin login:      admin@osta.ae / password123");
  console.log("Technician login: rashid@osta.ae / password123");
  console.log("Customer login:   customer@osta.ae / password123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
