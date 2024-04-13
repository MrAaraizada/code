#!/usr/bin/env node
import { Command } from "commander";

const program = new Command();

program
  .name("shadcn")
  .description("CLI for shadcn/ui components")
  .version("0.1.0");

program
  .command("add")
  .description("Add a component to your project")
  .argument("<component>", "component to add")
  .action((component) => {
    console.log(`Adding component: ${component}`);
  });

program.parse();
