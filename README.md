# Welcome to Docmind 📑

You can see and test the application here: https://doc-mind.vercel.app
Docmind is a **Next.js** application that allows you to **talk with your PDF**. It uses custom **vector database with OpenAI API** to perform search, it **works preety amazing** 😎, you can **see showcase** in documentation. Documentation is done using gitbook, you can find it **[here](https://docmind.gitbook.io/docmind/)**. Feel free to **star this project** ⭐. Contributors are welcome.



# Small Showcase 🎞️
**Whole showcase** can be seen in the **Documentation section** link below.

![Image](https://i.imgur.com/wIvFNe0.png)
![Image](https://i.imgur.com/2DBU1sb.png)

# Tech stack 🧑‍💻
The project uses top notch web technologies. 
* **Next.js 14.0.1** with App router.
* **Prisma 5.7.1**, for Postgre SQL database integration.
* **Next Auth v4**, for user authentication.
*  **OpenAI API**, to perform correct vestor search.
*  **Pinecone**, to store vectors in the database.
*  **Uploadthing**, to upload PDF files and store them.

# Installation 💻
In this part I describe how to **run the project** locally.
## Third party tools

First you **need to setup all third party tools**, and set corresponding **environmental variables**. I strongly **recommend using same tools as I did**, to not have any bugs (all of them are free).

* **Postgre SQL server**, in my case I used **[neon.tech](https://neon.tech)**. You should set **DATABASE_URL** variable 
to your corresponding Postgre SQL server link.

* **PDF File storing server**,  in my case I used **[uploadthing.com](https://uploadthing.com)**. You should set **UPLOADTHING_SECRET**, **UPLOADTHING_APP_ID** to your corresponding variables.

* **Vector database for LLM**, in my case I used **[pinecone.io](https://pinecone.io)** . You should set **PINECONE_API_KEY** to your corresponding api key.

* **OpenAI API key**, you can find the API key **[here](https://platform.openai.com/api-keys)** this is needed for the LLM to perform search over vector database. You should set **OPENAI_API_KEY** to your corresponding api key.

* **Github Auth support**, you can create your own app **[here](https://github.com/settings/apps)** when creating the app **set Callback URL** to ```http://localhost:3000/api/auth/callback/github```, then set **GITHUB_CLIENT_ID**, **GITHUB_CLIENT_SECRET** to your values.

* **Google Auth support**, you can create your own app **[here](https://console.cloud.google.com/apis/credentials/oauthclient) set callback URL** to ```http://localhost:3000/api/auth/callback/google```, then continue process of creating the app 
and insert **GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET** environmental variables.
* **Next Auth Secret**, you can use this command to get it : `openssl rand -base64 32` or get the random code from **[here](https://generate-secret.vercel.app/32)**, then assign **NEXTAUTH_SECRET** to the generated value. **NEXTAUTH_URL** should be your home page URL, for default settings **http://localhost:3000**

## Getting started
List of commands in order to build the app locally. 

Firstly, install all dependencies:


```bash
npm install
```

Secondly, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open your browser and go to **http://localhost:3000** to see the result. If you see the homepage, it works.

![Image](https://i.imgur.com/jspjbsX.png)
# Build 👷‍♂️
Here I describe how to build the project locally or online

## Hosting on third party server
in order to build the application and host it on third party server, here is an official **[Next.js docummentation](https://nextjs.org/docs/pages/building-your-application/deploying)**.

## Hosting on Vercel
The easiest way to deploy Next.js app is to use the **[Vercel Platform](https://vercel.com/new)** from the creators of Next.js.
Check out **[Next.js deployment docummentattion](https://nextjs.org/docs/pages/building-your-application/deploying)** for more details.
# Security 🔐

If you think you have found **a vulnerability (or are not sure)** in Docmind or any of the related packages (i.e. Adapters). Please do **not open Pull Requests/Issues/Discussions** before consulting with me. **Reach to me via email**: warzachowskip@gmail.com, and then you can pull request.

# Documentation  📃
Documentation is written in **GitBook**, it has whole **showcase of the application**. to check it out click **[here](https://docmind.gitbook.io/docmind/)**



# Contributing 🤝

Docmind is open to all community contributions! If you'd like to contribute in any way, please first read the **[Contributing Guide](https://github.com/nextauthjs/.github/blob/main/CONTRIBUTING.md)**.


# License 🪪
**MIT License**

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

**THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.**
