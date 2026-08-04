export default class Fl32_Tmpl_Back_Service_Render_Web {
    /**
     * @param {object} deps
     * @param {Fl32_Tmpl_Back_Dto_Target} deps.dtoTarget - Target DTO factory.
     * @param {Fl32_Tmpl_Back_Service_Render} deps.serviceRender - Base render service.
     * @param {typeof Fl32_Tmpl_Back_Enum_Type} deps.TYPE - Enum of template types.
     */
    constructor(
        {
            dtoTarget,
            serviceRender,
            TYPE,
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

export const __deps__ = Object.freeze({
    default: Object.freeze({
        dtoTarget: 'Fl32_Tmpl_Back_Dto_Target$',
        serviceRender: 'Fl32_Tmpl_Back_Service_Render$',
        TYPE: 'Fl32_Tmpl_Back_Enum_Type__default',
    }),
});
