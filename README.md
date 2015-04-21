# Treasure Map
---

## Intro
This project allows documentation authors to write documentation close to the code, while giving readers the option to centralize that documentation.

## How to contribute:
Just write and commit README files which match the target file name (default is `README.x.md`) wherever appropriate.

## How to Compile:
Once you have some documetation written, you can compile it all into a single README. 

*Note: The compiled output is should not be checked in due to merge conflict issues*


    $ node treasure_map.js

# How it works

## Compilation:
Compilation is a depth first traversal of directory structure to find module level READMEs
and generate an overall map and compiled documentation.


## Options:
Options are configured in `treasure_map_config.js`.

	Available Options:
	- startDirs
	-- List of dirs to recurisvely search 
	-- default = '.'
	
	- targetFileName
	-- file name for distributed READMEs
	-- default = 'README.x.md'
	
	- outputFile
	-- file name for compiled README
	-- default = 'README.x.md'
	
	- ignoreDirs
	-- list of dirs to ignore during search
	-- default = []
