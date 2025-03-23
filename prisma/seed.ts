import { auth } from "@/lib/auth";
import { faker } from "@faker-js/faker";
import { Application, PrismaClient, State, User } from "./generated/client";
const prisma = new PrismaClient();

async function seedAdminUser() {
  console.log("Starting to Seed Admin User");
  await auth.api.signUpEmail({
    body: {
      email: "admin@admin.com",
      password: "password123",
      name: "Admin",
    },
  });
}

async function seedAdditionalUser() {
  await auth.api.signUpEmail({
    body: {
      email: "alice@test.com",
      password: "alice123",
      name: "Alice",
    },
  });

  await auth.api.signUpEmail({
    body: {
      email: "bob@test.com",
      password: "bob12345",
      name: "Bob",
    },
  });
}

const STATES = ["PLANNED", "SENT", "TALK", "WAITING", "DECLINED"];

const getRandomApplicationState = (): State => {
  return STATES[Math.floor(Math.random() * STATES.length)] as State;
};

const getRandomUser = async (): Promise<User> => {
  const Users = await prisma.user.findMany();
  return Users[Math.floor(Math.random() * Users.length)];
};

const getRandomApplication = (): Omit<Application, "id" | "userId"> => {
  return {
    company: faker.company.name(),
    position: faker.person.jobTitle(),
    link: faker.internet.url(),
    state: getRandomApplicationState(),
    lastUpdate: faker.date.past(),
    sendDate: faker.date.past(),
    location: faker.location.city(),
  };
};

async function seedApplications(count: number) {
  for (let index = 0; index < count; index++) {
    const user = await getRandomUser();
    await prisma.application.create({
      data: { ...getRandomApplication(), user: { connect: { ...user } } },
    });
  }
}

async function main() {
  await seedAdminUser();
  await seedAdditionalUser();
  await seedApplications(1000);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
