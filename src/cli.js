#!/usr/bin/env node
require('dotenv').config()

const program = require("commander");
const chalk = require("chalk");
const axios = require("axios")
const fs = require('fs');

const BASE_URL=process.env.BASE_URL
const categories = ['addresses','books','companies','credit_cards','images','persons','places','products','texts','users']
program
  .version("1.0.0")
  .description("CLI tool to generate json file with fake data related to 10+ categories");

program
  .command("categories")
  .description(`Lists all available categories`)
  .action(() => {
    categories.forEach((category,idx)=>console.log(chalk.magenta(`${idx+1}.${category}`)))
  })

program
  .command("get <category> [quantity]")
  .description(`Get fake json data related to a category. category name is required parameter while the quantity is optional and will default to 5 if not passed`)
  .action((category,quantity) => {
      
    const quantityVal = quantity!=undefined?`?_quantity=${quantity}`:'?_quantity=5'

    axios.get(`${BASE_URL}/${category}${quantityVal}`)
    .then(res=>{
        const resp = JSON.stringify(res?.data?.data)
        fs.writeFile('fakejson.json', resp, function (err) {
            if (err) throw err;
            console.log(chalk.cyan(`File Created !`));
          });
    })
    .catch(err=>console.log(chalk.red(`Something went wrong !`)))
  })

  program.parse(process.argv);