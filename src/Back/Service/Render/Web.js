export default class Fl32_Tmpl_Back_Service_Render_Web {
    /**
     * @param {Fl32_Tmpl_Back_Dto_Target} dtoTarget - Target DTO factory.
     * @param {Fl32_Tmpl_Back_Service_Render} serviceRender - Base render service.
     * @param {typeof Fl32_Tmpl_Back_Enum_Type} TYPE - Enum of template types.
     */
    constructor(
        {
            Fl32_Tmpl_Back_Dto_Target$: dtoTarget,
            Fl32_Tmpl_Back_Service_Render$: serviceRender,
            Fl32_Tmpl_Back_Enum_Type$: TYPE,
        }
    ) {
        /**
         * Render a localized web template.
         * @param {object} args - Rendering parameters.
         * @param {string} args.name - Template filename with extension.
         * @param {string} [args.pkg] - Optional npm package name.
         * @param {Fl32_Tmpl_Back_Dto_Locale.Dto} args.locales - Locale data object.
         * @param {object} [args.data] - Template context data.
         * @param {object} [args.options] - Engine specific render options.
         * @returns {Promise<{resultCode:string, content:string|null}>}
         */
        this.perform = async function (
            {
                name,
                pkg = '',
                locales,
                data = {},
                options = {},
            }
        ) {
            const target = dtoTarget.create({
                type: TYPE.WEB,
                name,
                pkg,
                locales,
            });

            return serviceRender.perform({target, data, options});
        };
    }
}
