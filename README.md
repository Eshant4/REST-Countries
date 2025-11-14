🌍 Rest Countries Explorer

A sleek and responsive country explorer web app built with Next.js, TypeScript, TailwindCSS, and Headless UI, using data from the REST Countries API dataset (local JSON). Users can:

Switch Dark / Light theme

Search countries by name

Filter by region

View details of each country with border navigation

Fully responsive UI based on Frontend Mentor design

🚀 Demo

🔗 Live Demo (deploy on Vercel and add link here)

https://rest-countries-sonu.vercel.app](https://rest-countries-two-topaz.vercel.app/

🛠 Tech Stack
Technology	Purpose
Next.js 14 (App Router)	Framework
TypeScript	Type safety
TailwindCSS	Styling
Headless UI (Menu)	Custom dropdown
React Icons	Icons
Local JSON data	Country dataset
✨ Features

🌗 Dark / Light mode toggle with Context API

🔍 Search for countries

🌎 Filter by region (Africa, Americas, Asia, Europe, Oceania)

📄 Country detail page with full info

🔁 Border countries navigation

📱 Responsive UI for all screens

🧠 Uses useMemo for performance optimization

📦 Installation

Clone the repo:

git clone https://github.com/Eshant4/REST-Countries.git
cd rest-countries


Install dependencies:

npm install
# or
yarn
# or
pnpm install


Run development server:

npm run dev


Visit in browser:

http://localhost:3000

📁 Folder Structure
app/
 ├── page.tsx                # Home page
 ├── country/[code]/page.tsx # Detail page
 ├── MyContext.tsx           # Theme context
 ├── data.json               # Countries dataset
 ├── globals.css             # Global styles

🧭 Core Functionalities
Dark / Light Theme Context
import { useTheme } from "./MyContext";

const { theme, toggleTheme } = useTheme();

Filter Dropdown using Headless UI
<Menu>
  <Menu.Button>Filter by Region</Menu.Button>
  <Menu.Items>
    {regions.map((r) => (
      <Menu.Item>{r}</Menu.Item>
    ))}
  </Menu.Items>
</Menu>

Dynamic Route page
<Link href={`/country/${country.code}`}>

🌄 Screenshots

<img width="1901" height="953" alt="image" src="https://github.com/user-attachments/assets/fa53d307-ed25-432e-8fe3-f7ebd73ee104" />
<img width="250" height="533" alt="image" src="https://github.com/user-attachments/assets/5b3e4c13-da71-4d8d-81f5-d0ffd2ea11c4" />

<img width="1883" height="929" alt="image" src="https://github.com/user-attachments/assets/c1b1c5ab-c323-4e6b-910c-1b773f479a68" />
<img width="1899" height="926" alt="image" src="https://github.com/user-attachments/assets/fe6c61d7-52b4-42a6-a433-fd3edb214831" />


🧑‍💻 Developer

Eshant Jangra

MERN / Next.js / TypeScript

Performance-oriented full-stack dev

🔗 Deployment

Deploy easily on Vercel:

vercel


Docs: https://nextjs.org/docs/pages/building-your-application/deploying

⭐ Support

If you found this helpful, please star the repo ⭐
and follow for more cool UI projects!
