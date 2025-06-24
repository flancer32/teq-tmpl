export default class Fl32_Tmpl_Back_Service_Render_Web {
    /* eslint-disable jsdoc/check-param-names */
    /**
     * @param {Fl32_Tmpl_Back_Dto_Target} dtoTarget - Target DTO factory.
     * @param {Fl32_Tmpl_Back_Config} config - Templates configuration.
     * @param {Fl32_Tmpl_Back_Service_Render} serviceRender - Base render service.
     * @param {typeof Fl32_Tmpl_Back_Enum_Type} TYPE
     */
    constructor(
        {
            Fl32_Tmpl_Back_Dto_Target$: dtoTarget,
            Fl32_Tmpl_Back_Config$: config,
            Fl32_Tmpl_Back_Service_Render$: serviceRender,
            Fl32_Tmpl_Back_Enum_Type$: TYPE,
        }
    ) {
        /* eslint-enable jsdoc/check-param-names */
        /**
         * Render a localized web template.
         * @param {object} args - Rendering parameters.
         * @param {string} args.name - Template filename with extension.
         * @param {string} args.locale - User requested locale.
         * @param {string} [args.pkg] - Optional npm package name.
         * @param {object} [args.data] - Template context data.
         * @param {object} [args.options] - Engine specific render options.
         * @returns {Promise<{resultCode:string, content:string|null}>}
         */
        this.perform = async function (
            {
                name,
                locale,
                pkg = '',
                data = {},
                options = {},
            }
        ) {
            const defaultLocale = config.getDefaultLocale();
            const target = dtoTarget.create({
                type: TYPE.WEB,
                name,
                pkg,
                locales: {
                    user: locale,
                    app: defaultLocale,
                    pkg: defaultLocale,
                },
            });

            return serviceRender.perform({target, data, options});
        };
    }
}
