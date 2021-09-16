# FAQ

## How do I run a script for every page?
The ready in default.hbs

## How do I add a new script?
Put new script under assets\js\lib then run `gulp build`

## How do I add a new css file?
1. Put new .css under assets\css
2. Add an import in assets\css\screen.css
3. Run `gulp build`

## How do I complile the scripts/styles?
Run `gulp build`

## How do I add a new single style to the existing .css file?
Modify assets\css\screen.css, remember to build after

## How do I modify routes?
1. Modify routes.yaml
2. Upload routes.yaml to the admin panel > settings > labs > routes