#!/usr/bin/env ts-node

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import colors from 'colors';
import commander from 'commander';
import { readFile, writeFile } from 'fs/promises';
import glob from 'glob-promise';
import { join } from 'path';
import { prettifyPromptbookString } from '../../src/conversion/prettify/prettifyPromptbookString';
import { commit } from '../utils/autocommit/commit';
import { isWorkingTreeClean } from '../utils/autocommit/isWorkingTreeClean';

if (process.cwd() !== join(__dirname, '../..')) {
    console.error(colors.red(`CWD must be root of the project`));
    process.exit(1);
}

const PROMPTBOOK_SAMPLES_DIR = join(process.cwd(), 'samples/templates');

const program = new commander.Command();
program.option('--commit', `Autocommit changes`, false);
program.parse(process.argv);
const { commit: isCommited } = program.opts();

generateSampleGraphs({ isCommited })
    .catch((error) => {
        console.error(colors.bgRed(error.name));
        console.error(error);
        process.exit(1);
    })
    .then(() => {
        process.exit(0);
    });

async function generateSampleGraphs({ isCommited }: { isCommited: boolean }) {
    console.info(`🏭📖  Generate samples mermaid graphs -> .ptbk.md`);

    if (isCommited && !(await isWorkingTreeClean(process.cwd()))) {
        throw new Error(`Working tree is not clean`);
    }

    for (const promptbookMarkdownFilePath of await glob(
        join(PROMPTBOOK_SAMPLES_DIR, '*.ptbk.md').split('\\').join('/'),
    )) {
        console.info(`📖  Generating mermaid graph in ${promptbookMarkdownFilePath}`);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let promptbookMarkdown = (await readFile(promptbookMarkdownFilePath, 'utf-8')) as any; /* <- TODO: Remove any */

        try {
            promptbookMarkdown = prettifyPromptbookString(promptbookMarkdown, {
                isGraphAdded: true,
                isPrettifyed: true,
                // <- [🕌]
            });

            await writeFile(promptbookMarkdownFilePath, promptbookMarkdown);
        } catch (error) {
            if (!(error instanceof Error)) {
                throw error;
            }

            console.info(colors.bgWhite('========================='));
            console.info(colors.red(`Error in ${promptbookMarkdownFilePath}`));
            console.error(colors.bgRed(error.name));
            console.error(error);
            console.info(colors.bgWhite('========================='));
        }
    }

    if (isCommited) {
        await commit(PROMPTBOOK_SAMPLES_DIR, `📖 Generate samples mermaid graphs -> .ptbk.md`);
    }

    console.info(`[ Done 📖  Generate samples mermaid graphs -> .ptbk.md]`);
}

/**
 * TODO: Maybe use some Mermaid library instead of string templating
 * TODO: [🕌] When more functionalities than graph and prettify, rename the script
 * TODO: [🌰] Use just prettifyPromptbookStringCli
 */

