/* eslint-disable max-lines-per-function */
(function generateCustomTheme(window) {
    window.generateCustomTheme = function generateCustomTheme(colors_) {
        const stylus = require("stylus");
        const fs = require("fs-extra");
        const path = require("path");
        const colors = JSON.parse(localStorage.customTheme) || {
            background: "fff",
            foreground: "333",
            shadows: "000",
            act: "446adb",
            acttext: "446adb",
            accent1: "5144db",
            accent2: "44dbb5",
            error: "d44f57",
            success: "4ab660",
            warning: "ff9748",
            themeDark: "false",
            borderPale: "e1e2e5",
            borderBright: "c8cdd1",
            text: "666",
            backgroundDeeper: "fafafa",
        };

        const defaultColors = {
            background: "fff",
            foreground: "333",
            shadows: "000",
            act: "446adb",
            acttext: "446adb",
            accent1: "5144db",
            accent2: "44dbb5",
            error: "d44f57",
            success: "4ab660",
            warning: "ff9748",
            themeDark: "false",
            borderPale: "e1e2e5",
            borderBright: "c8cdd1",
            text: "666",
            backgroundDeeper: "fafafa",
        };

        // This ensures needed properties aren't undefined.
        for (const i in defaultColors) {
            if (!colors[i]) colors[i] = defaultColors[i];
        }

        for (const i in colors_) {
            colors[i] = colors_[i];
        }

        const theme = `@charset "utf-8"

background = #${colors.background}
foreground = #${colors.foreground}
shadows = #${colors.shadows}

/* Frequently used properties */
trans =
    transition 0.35s ease all
transshort =
    transition 0.15s ease all
shad =
    box-shadow 0 0.1rem 0.1rem rgba(shadows, 0.05), 0 0.2rem 0.3rem rgba(shadows, 0.1), 0 0.3rem 0.5rem rgba(shadows, 0.05)
shadamb =
    box-shadow 0 0.1rem 0.25rem rgba(shadows, 0.15), 0 0.5rem 0.5rem rgba(shadows, 0.08), 0 1rem 1rem rgba(shadows, 0.05), 0 1.5rem 1.5rem rgba(shadows, 0.03)

/* Base fonts for UI */
fonts = font = 'Open Sans', sans-serif, serif
font-mono = mono = Iosevka, monospace

br = 0.2rem
iconsize = 1.5rem

/* Colors used by this theme */
act = #${colors.act}
acttext = #${colors.acttext}
accent1 = #${colors.accent1}
accent2 = #${colors.accent2}
error = #${colors.error}
red = error
success = #${colors.success}
green = success
warning = #${colors.warning}
orange = warning

theme = 'Custom'
themeDark = ${colors.themeDark}

borderPale = #${colors.borderPale}
borderBright = #${colors.borderBright}

text = #${colors.text}
backgroundDeeper = #${colors.backgroundDeeper}


@require 'hvost.styl'

@require '3rdParty/*.styl'
@require './../../app/node_modules/highlight.js/styles/tomorrow.css'

@require 'common.styl'
@require 'inputs.styl'
@require 'typography.styl'
@require 'confetti.styl'
@require 'buildingBlocks.styl'
@require 'tabs.styl'

@require 'tags/**/*.styl'
`;

        stylus(theme)
            .set("paths", [path.join(__dirname, "..", "src", "styl")])
            .render(function result(err, css) {
                if (err) console.error(err);
                console.debug(css);
                localStorage.customTheme = JSON.stringify(colors);
                fs.writeFileSync(path.join(__dirname, "data", "themeCustom.css"), css);
            });

        localStorage.UItheme = "Custom";
        document.getElementById("themeCSS").href = `./data/themeCustom.css`;
        window.signals.trigger("UIThemeChanged", "Custom");

        return theme;
    };
})(this);
