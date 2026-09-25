declare global {
    type Fl32_Tmpl_Back_Act_File_Find = import("./src/Back/Act/File/Find.js").default;
    type Fl32_Tmpl_Back_Act_File_Load = import("./src/Back/Act/File/Load.js").default;
    type Fl32_Tmpl_Back_Act_File_Load_Result = {content: string|null};
    type Fl32_Tmpl_Back_Api_Engine = import("./src/Back/Api/Engine.js").default;
    type Fl32_Tmpl_Back_Config = import("./src/Back/Config.js").default;
    type TeqFw_Cli_Config = Readonly<{
        applicationRoot: string;
        cwd: string;
        argv: ReadonlyArray<string>;
        dotenvPath: string | undefined;
        dotenvExplicit: boolean;
    }>;
    type Fl32_Tmpl_Back_Dto_Locale = import("./src/Back/Dto/Locale.js").default;
    type Fl32_Tmpl_Back_Dto_Locale__DTO = import("./src/Back/Dto/Locale.js").Fl32_Tmpl_Back_Dto_Locale__DTO;
    type Fl32_Tmpl_Back_Dto_Target = import("./src/Back/Dto/Target.js").default;
    type Fl32_Tmpl_Back_Dto_Target__DTO = import("./src/Back/Dto/Target.js").Fl32_Tmpl_Back_Dto_Target__DTO;
    type Fl32_Tmpl_Back_Factory_Nunjucks_Env = import("./src/Back/Factory/Nunjucks/Env.js").default;
    type Fl32_Tmpl_Back_Helper_Cast = import("./src/Back/Helper/Cast.js").default;
    type Fl32_Tmpl_Back_Helper_Locale = import("./src/Back/Helper/Locale.js").default;
    type Fl32_Tmpl_Back_Mustache = typeof import('mustache');
    type Fl32_Tmpl_Back_Node_Fs = typeof import('node:fs');
    type Fl32_Tmpl_Back_Node_FsPromises = typeof import('node:fs/promises');
    type Fl32_Tmpl_Back_Node_Path = typeof import('node:path');
    type Fl32_Tmpl_Back_Nunjucks = typeof import('nunjucks');
    type Fl32_Tmpl_Back_Nunjucks_Environment = import('nunjucks')['Environment'];
    type Fl32_Tmpl_Back_Nunjucks_Loader = import('nunjucks')['Loader'];
    type Fl32_Tmpl_Back_Service_Engine_Mustache = import("./src/Back/Service/Engine/Mustache.js").default;
    type Fl32_Tmpl_Back_Service_Engine_Nunjucks = import("./src/Back/Service/Engine/Nunjucks.js").default;
    type Fl32_Tmpl_Back_Service_Engine_Simple = import("./src/Back/Service/Engine/Simple.js").default;
    type Fl32_Tmpl_Back_Service_Load = import("./src/Back/Service/Load.js").default;
    type Fl32_Tmpl_Back_Service_Load_Result = {resultCode: string, template: string | null | undefined, path: string | null | undefined};
    type Fl32_Tmpl_Back_Service_Render = import("./src/Back/Service/Render.js").default;
    type Fl32_Tmpl_Back_Service_Render_Result = {resultCode: string, content: string|null};
    type Fl32_Tmpl_Back_Service_Render_Web = import("./src/Back/Service/Render/Web.js").default;

    type Fl32_Tmpl_Back_Enum_Type = typeof import("./src/Back/Enum/Type.js").default;
}

export {};
