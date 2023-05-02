const vscode = require('vscode');
const XBASIC_MODE = { scheme: 'file', language: 'X-BASIC' };

const tokenTypes = ['class', 'interface', 'enum', 'function', 'variable'];
const tokenModifiers = ['declaration', 'documentation'];
const legend = new vscode.SemanticTokensLegend(tokenTypes, tokenModifiers);

// func定義
let func_list = [];

// X-BASIC関数
const Method_list = [
    ['Method'   , 'abs'      , '()' ],
    ['Interface', 'apage'    , '()' ],
    ['Method'   , 'asc'      , '()' ],
    ['Method'   , 'atan'     , '()' ],
    ['Method'   , 'atof'     , '()' ],
    ['Method'   , 'atoi'     , '()' ],
    ['Event'    , 'auto'     , ' '  ],
    ['Interface', 'a_play'   , '()' ],
    ['Interface', 'a_rec'    , '()' ],
    ['Keyword'  , 'beep'     , ''   ],
    ['Interface', 'bg_fill'  , '()' ],
    ['Interface', 'bg_get'   , '()' ],
    ['Interface', 'bg_put'   , '()' ],
    ['Interface', 'bg_scroll', '()' ],
    ['Interface', 'bg_set'   , '()' ],
    ['Interface', 'bg_stat'  , '()' ],
    ['Method'   , 'bin$'     , '()' ],
    ['Interface', 'box'      , '()' ],
    ['Keyword'  , 'break'    , ''   ],
    ['Keyword'  , 'char'     , ' '  ],
    ['Event'    , 'chdir'    , ' '  ],
    ['Event'    , 'chdrv'    , ' '  ],
    ['Event'    , '!'        , ''   ],
    ['Method'   , 'chr$'     , '()' ],
    ['Interface', 'circle'   , '()' ],
    ['Event'    , 'clear'    , ''   ],
    ['Keyword'  , 'cls'      , ''   ],
    ['Keyword'  , 'color'    , ' '  ],
    ['Keyword'  , 'color'    , ' []'],
    ['Keyword'  , 'console'  , ' '  ],
    ['Event'    , 'cont'     , ''   ],
    ['Keyword'  , 'continue' , ''   ],
    ['Interface', 'contrast' , '()' ],
    ['Method'   , 'cos'      , '()' ],
    ['Method'   , 'crt'      , '()' ],
    ['Variable' , 'csrlin'   , ''   ],
    ['Variable' , 'date$'    , ''   ],
    ['Variable' , 'day$'     , ''   ],
    ['Event'    , 'delete'   , ' '  ],
    ['Keyword'  , 'dim'      , ' '  ],
    ['Method'   , 'dskf'     , '()' ],
    ['Method'   , 'ecvt'     , '()' ],
    ['Keyword'  , 'end'      , ''   ],
    ['Variable' , 'errno'    , ''   ],
    ['Keyword'  , 'error on' , ''   ],
    ['Keyword'  , 'error off', ''   ],
    ['Keyword'  , 'exit'     , '()' ],
    ['Method'   , 'exp'      , '()' ],
    ['Method'   , 'fclose'   , '()' ],
    ['Method'   , 'fcloseall', '()' ],
    ['Method'   , 'fcvt'     , '()' ],
    ['Method'   , 'fdelete'  , '()' ],
    ['Method'   , 'feof'     , '()' ],
    ['Method'   , 'fgetc'    , '()' ],
    ['Event'    , 'files'    , ' '  ],
    ['Interface', 'fill'     , '()' ],
    ['Method'   , 'fix'      , '()' ],
    ['Keyword'  , 'float'    , ' '  ],
    ['Method'   , 'fopen'    , '()' ],
    ['Keyword'  , 'for'      , ' '  ],
    ['Keyword'  , 'to'       , ' '  ],
    ['Keyword'  , 'next'     , ''   ],
    ['Method'   , 'fputc'    , '()' ],
    ['Method'   , 'fread'    , '()' ],
    ['Method'   , 'freads'   , '()' ],
    ['Variable' , 'free'     , ''   ],
    ['Method'   , 'frename'  , '()' ],
    ['Method'   , 'fseek'    , '()' ],
    ['Keyword'  , 'func'     , ' '  ],
    ['Keyword'  , 'endfunc'  , ''   ],
    ['Keyword'  , 'return'   , '()' ],
    ['Method'   , 'fwrite'   , '()' ],
    ['Method'   , 'fwrites'  , '()' ],
    ['Method'   , 'gcvt'     , '()' ],
    ['Interface', 'get'      , '()' ],
    ['Keyword'  , 'gosub'    , ' '  ],
    ['Keyword'  , 'return'   , ''   ],
    ['Keyword'  , 'goto'     , ' '  ],
    ['Method'   , 'hex$'     , '()' ],
    ['Interface', 'home'     , '()' ],
    ['Interface', 'hsv'      , '()' ],
    ['Keyword'  , 'if'       , ' '  ],
    ['Keyword'  , 'then'     , ' '  ],
    ['Keyword'  , 'else'     , ' '  ],
    ['Interface', 'img_color', '()' ],
    ['Interface', 'img_home' , '()' ],
    ['Interface', 'img_ht'   , '()' ],
    ['Interface', 'img_load' , '()' ],
    ['Interface', 'img_pos'  , '()' ],
    ['Interface', 'img_put'  , '()' ],
    ['Interface', 'img_save' , '()' ],
    ['Interface', 'img_scrn' , '()' ],
    ['Interface', 'img_set'  , '()' ],
    ['Interface', 'img_still', '()' ],
    ['Variable' , 'inkey$'   , ''   ],
    ['Variable' , 'inkey$'   , '()' ],
    ['Keyword'  , 'input'    , ' '  ],
    ['Method'   , 'instr'    , '()' ],
    ['Keyword'  , 'int'      , ' '  ],
    ['Method'   , 'int'      , '()' ],
    ['Method'   , 'isalnum'  , '()' ],
    ['Method'   , 'isalpha'  , '()' ],
    ['Method'   , 'isascii'  , '()' ],
    ['Method'   , 'iscntrl'  , '()' ],
    ['Method'   , 'isdigit'  , '()' ],
    ['Method'   , 'isgraph'  , '()' ],
    ['Method'   , 'islower'  , '()' ],
    ['Method'   , 'isprint'  , '()' ],
    ['Method'   , 'ispunct'  , '()' ],
    ['Method'   , 'isspace'  , '()' ],
    ['Method'   , 'isupper'  , '()' ],
    ['Method'   , 'isxdigit' , '()' ],
    ['Method'   , 'itoa'     , '()' ],
    ['Keyword'  , 'key'      , ' '  ],
    ['Event'    , 'key list' , ''   ],
    ['Event'    , 'kill'     , ' ""'],
    ['Method'   , 'left$'    , '()' ],
    ['Interface', 'line'     , '()' ],
    ['Keyword'  , 'linput'   , ' '  ],
    ['Event'    , 'list'     , ' '  ],
    ['Event'    , 'load'     , ' ""'],
    ['Event'    , 'load @'   , ' ""'],
    ['Keyword'  , 'locate'   , ' '  ],
    ['Method'   , 'log'      , '()' ],
    ['Method'   , 'mid$'     , '()' ],
    ['Method'   , 'mirror$'  , '()' ],
    ['Interface', 'mouse'    , '()' ],
    ['Interface', 'mousearea', '()' ],
    ['Interface', 'msbtn'    , '()' ],
    ['Interface', 'mspos'    , '()' ],
    ['Interface', 'msstat'   , '()' ],
    ['Interface', 'm_alloc'  , '()' ],
    ['Interface', 'm_assign' , '()' ],
    ['Interface', 'm_cont'   , '()' ],
    ['Interface', 'm_free'   , '()' ],
    ['Interface', 'm_init'   , ''   ],
    ['Interface', 'm_play'   , '()' ],
    ['Interface', 'm_stat'   , '()' ],
    ['Interface', 'm_stop'   , '()' ],
    ['Interface', 'm_tempo'  , '()' ],
    ['Interface', 'm_trk'    , '()' ],
    ['Interface', 'm_vget'   , '()' ],
    ['Interface', 'm_vset'   , '()' ],
    ['Event'    , 'name'     , ' ""'],
    ['Event'    , 'new'      , ''   ],
    ['Method'   , 'oct$'     , '()' ],
    ['Interface', 'paint'    , '()' ],
    ['Interface', 'palet'    , '()' ],
    ['Method'   , 'pi'       , '()' ],
    ['Interface', 'point'    , '()' ],
    ['Variable' , 'pos'      , ''   ],
    ['Method'   , 'pow'      , '()' ],
    ['Keyword'  , 'print'    , ' '  ],
    ['Interface', 'pset'     , '()' ],
    ['Interface', 'put'      , '()' ],
    ['Method'   , 'rand'     , '()' ],
    ['Method'   , 'randomize', '()' ],
    ['Keyword'  , '/*'       , ' '  ],
    ['Event'    , 'renum'    , ' '  ],
    ['Keyword'  , 'repeat'   , ''   ],
    ['Keyword'  , 'until'    , ' '  ],
    ['Interface', 'rgb'      , '()' ],
    ['Method'   , 'right$'   , '()' ],
    ['Method'   , 'rnd'      , '()' ],
    ['Event'    , 'run'      , ' '  ],
    ['Event'    , 'run'      , ' ""'],
    ['Event'    , 'save'     , ' ""'],
    ['Event'    , 'save @'   , ' ""'],
    ['Keyword'  , 'screen'   , ' '  ],
    ['Event'    , 'search'   , ' ""'],
    ['Interface', 'setmspos' , '()' ],
    ['Method'   , 'sgn'      , '()' ],
    ['Method'   , 'sin'      , '()' ],
    ['Method'   , 'space$'   , '()' ],
    ['Interface', 'sp_clr'   , '()' ],
    ['Interface', 'sp_color' , '()' ],
    ['Interface', 'sp_def'   , '()' ],
    ['Interface', 'sp_disp'  , '()' ],
    ['Interface', 'sp_init'  , '()' ],
    ['Interface', 'sp_move'  , '()' ],
    ['Interface', 'sp_off'   , '()' ],
    ['Interface', 'sp_on'    , '()' ],
    ['Interface', 'sp_pat'   , '()' ],
    ['Interface', 'sp_set'   , '()' ],
    ['Interface', 'sp_stat'  , '()' ],
    ['Method'   , 'sqr'      , '()' ],
    ['Method'   , 'srand'    , '()' ],
    ['Interface', 'stick'    , '()' ],
    ['Keyword'  , 'stop'     , ''   ],
    ['Keyword'  , 'str'      , ' '  ],
    ['Method'   , 'str$'     , '()' ],
    ['Method'   , 'strchr'   , '()' ],
    ['Method'   , 'strcspn'  , '()' ],
    ['Interface', 'strig'    , '()' ],
    ['Method'   , 'string$'  , '()' ],
    ['Method'   , 'strlen'   , '()' ],
    ['Method'   , 'len'      , '()' ],
    ['Method'   , 'strlwr'   , '()' ],
    ['Method'   , 'strnset'  , '()' ],
    ['Method'   , 'strrchr'  , '()' ],
    ['Method'   , 'strrev'   , '()' ],
    ['Method'   , 'strset'   , '()' ],
    ['Method'   , 'strspn'   , '()' ],
    ['Method'   , 'strtok'   , '()' ],
    ['Method'   , 'strupr'   , '()' ],
    ['Keyword'  , 'switch'   , ' '  ],
    ['Keyword'  , 'case'     , ' '  ],
    ['Keyword'  , 'default:' , ''   ],
    ['Keyword'  , 'endswitch', ''   ],
    ['Interface', 'symbol'   , '()' ],
    ['Event'    , 'system'   , ''   ],
    ['Method'   , 'tan'      , '()' ],
    ['Variable' , 'time$'    , ''   ],
    ['Method'   , 'toascii'  , '()' ],
    ['Method'   , 'tolower'  , '()' ],
    ['Method'   , 'toupper'  , '()' ],
    ['Method'   , 'val'      , '()' ],
    ['Interface', 'vpage'    , '()' ],
    ['Interface', 'v_cut'    , '()' ],
    ['Keyword'  , 'while'    , ' '  ],
    ['Keyword'  , 'endwhile' , ''   ],
    ['Event'    , 'width'    , ' '  ],
    ['Interface', 'window'   , '()' ],
    ['Interface', 'wipe'     , '()' ]
];

function activate(context) {
    // Formatter
    //  ファイル終端にEOFを付加
    vscode.languages.registerDocumentFormattingEditProvider('X-BASIC', {
        provideDocumentFormattingEdits(document) {
            const endLine = document.lineAt(document.lineCount-1);
            if (!endLine.text.includes('\x1a')) {
                return [vscode.TextEdit.insert(endLine.range.end, '\x1a')];
            }
        }
    });

    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(XBASIC_MODE, new XbasicCompletionItemProvider(), ''));
    context.subscriptions.push(vscode.languages.registerDocumentSemanticTokensProvider(XBASIC_MODE, new XbasicDocumentSemanticTokensProvider(), legend));
    context.subscriptions.push(vscode.languages.registerDefinitionProvider(XBASIC_MODE, new XbasicDefinitionProvider()));
}

function deactivate() {
    return undefined;
}

// コード補完機能
class XbasicCompletionItemProvider {
    provideCompletionItems(document, position, token) {
        // コード補完設定
        let completionItems = [];
        Method_list.forEach(element => {
            completionItems.push({
                label: element[1]+element[2],
                kind: vscode.CompletionItemKind[element[0]]
            });
        });
        const completionList = new vscode.CompletionList(completionItems, false);
        return Promise.resolve(completionList);
    }
}

// セマンティックハイライト機能
class XbasicDocumentSemanticTokensProvider {
    provideDocumentSemanticTokens(document) {
        // func定義を抽出
        func_list = [];
        const regexp = /func( int| char| float| str| void)? [a-z0-9_]+[\\(]/g;
        for(let i = 0; i < document.lineCount; i++){
            const str = document.lineAt(i).text;
            const matches_array = str.match(regexp);
            if(matches_array){
                let func_name = matches_array[0].split(' ').pop().replace('(', '');
                func_list.push([func_name, i, str.indexOf(func_name)]);
            }
        }

        // ハイライト設定
        const tokensBuilder = new vscode.SemanticTokensBuilder(legend);
        for(let i = 0; i < document.lineCount; i++){
            const str = document.lineAt(i).text;
            func_list.forEach(element => {
                let pos = 0;
                while (pos >= 0) {
                    const word = element[0];
                    pos = str.indexOf(word + '(', pos);
                    if (pos >= 0) {
                        if (pos > 0) {
                            const befor = str.substr(pos - 1, 1);
                            if (!(befor === ' ' || befor === ':')) {
                                pos++;
                                continue;
                            }
                        }
                        tokensBuilder.push(
                            new vscode.Range(new vscode.Position(i, pos), new vscode.Position(i, pos + word.length)),
                            'function',
                            ['declaration']
                        );
                        pos++;
                    }
               };
            });
        };
        return tokensBuilder.build();
    }
};

// func定義機能
class XbasicDefinitionProvider {
    provideDefinition(document, position, token) {
        const wordRange = document.getWordRangeAtPosition(position, /[a-zA-Z0-9_]+/);
        if (!wordRange) return Promise.reject('No word here.');

        const currentWord = document.lineAt(position.line).text.slice(wordRange.start.character, wordRange.end.character);

        let line;
        let index;
        let found = false;
        func_list.forEach(element => {
            if (currentWord === element[0]) {
                line = element[1];
                index = element[2];
                found = true;
            }            
        });
        if (!found) return Promise.reject('No definition found');

        const uri = vscode.Uri.file(document.fileName);
        const pos = new vscode.Position(line, index);
        const loc = new vscode.Location(uri, pos);
        return Promise.resolve(loc);
    }
}

module.exports = { activate, deactivate};
