console.log('a11y-helper is running');
marauderMenu();

function swearUptoNoGood(phrase) {
    var rightPW = 'mischief';
    if (rightPW === phrase) {
        return true;
    } else {
        $('#marauderMap').remove();
        return false;
    }
}

function marauderMenu() {
    var options = ['sensory highlighter', 'nbsp highlighter', 'trickle bypass', 'open accordions', 'verify accordion count'];
    var lis = options.map(function(item) {
        return ('<li>' + item + '</li>');
    });
    $('#marauderMap').empty().append('<ul></ul>');
    for (let li of lis) {
        $('#marauderMap').find('ul').append(li);
    }

    $('#marauderMap').find('li').on('click', function() {
        var selection = $(this).text();
        switch (selection) {
            case options[0]:
                console.log(sensoryHighlighter());
                $('#marauderMap').remove();
                break;
            case options[1]:
                console.log(nbspHighlighter());
                $('#marauderMap').remove();
                break;
            case options[2]:
                console.log(trickleBypass());
                $('#marauderMap').remove();
                break;
            case options[3]:
                console.log(openAccordion());
                $('#marauderMap').remove();
                break;
            case options[4]:
                console.log(verifyAccordion());
                $('#marauderMap').remove();
                break;

        }
    });
}

function sensoryHighlighter() {
    var terms_to_check = ['up', 'down', 'left', 'right', 'top', 'bottom', 'click here', 'more info', 'above', 'below', 'blue', 'red', 'yellow', 'image', 'highlight', 'highlighted', 'learn more', 'link'];

    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };


    var css = 'highlight { padding: 0px 5px; line-height: 175%; font-size: 130%; font-weight: bold; border: red 3px solid; cursor: pointer; transition: all 0.5s} highlight:hover { background: #ff000094 } .exit-highlight { width: 25%; background: #69459C; position: fixed; bottom: 0; left: 0; z-index: 9999; } body.notranslate { width: 75%!important; margin-left: 25%; } .highlight-menu {background: #c3c3c3; width: 25%; position: absolute; height: 100%; left: 0; top: 0; box-shadow: 0 14px 28px rgb(0 0 0 / 15%), 0 10px 10px rgb(0 0 0 / 15%); } .keep-open { display: block!important; } .highlight-menu li { padding-left: 2em;text-indent: -1em;margin: 0;padding-bottom: 5px;padding-top: 5px;} .highlight-menu ul, .highlight-menu li { list-style-type: none; } .highlight-menu li:hover {background: #69459C;cursor: pointer;}',
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

    head.appendChild(style);

    style.type = 'text/css';
    if (style.styleSheet) {
        // This is required for IE8 and below.
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    };

    var exit_button = document.createElement('button');
    exit_button.setAttribute('class', 'exit-highlight');
    exit_button.innerHTML = 'Exit Sensory Highlighter';
    document.body.append(exit_button)

    $('.exit-highlight').on('click', function() {
        location.reload();
    });

    var menu = document.createElement('div');
    menu.setAttribute('class', 'highlight-menu');
    var ul = document.createElement('ul');
    menu.append(ul);
    document.body.append(menu);

    var count_diz = 0;
    var count_unit = 0;

    function replaceForHighlighted() {
        $('.accordion-item-body').addClass('keep-open');
        $("p, .block-title-inner, .component-instruction-inner, .component-body-inner").each(function(i, text) {
            var inside = this.innerHTML;
            terms_to_check.forEach(term => {
                var capitalized_term = term.charAt(0).toUpperCase() + term.substr(1).toLowerCase();
                var opening_tag = ' <highlight id="' + 'sensory' + count_diz + count_unit + '">';
                inside = inside.replace(' ' + term, opening_tag + term + '</highlight>').replace(' ' + capitalized_term, opening_tag + capitalized_term + '</highlight>');
                inside = inside.replaceAll(' ' + term, '<highlight>' + term + '</highlight>').replaceAll(' ' + capitalized_term, '<highlight>' + capitalized_term + '</highlight>');
                count_unit++;
            })
            this.innerHTML = inside;
            count_diz++;
        });

        var pos_list = [];
        $('.highlight-menu ul').empty();
        $('highlight').each(function() {
            var link = document.createElement('a');
            link.innerHTML = this.innerHTML;
            var height = this.parentNode.scrollHeight
            var li = document.createElement('li');
            li.setAttribute('tag-id', this.id);
            li.setAttribute('onclick', 'scrollInPage(' + this.id + ')');
            li.append(link);
            $('.highlight-menu ul').append(li);
            if (pos_list.indexOf(height) !== -1 && height !== 0) {} else if (height === 0) {
                pos_list.push(height);
            } else {
                pos_list.push(height);
            }
        })

        $("highlight").dblclick(function() {
            var id = this.id;
            var word = this.innerHTML;
            var text = document.createTextNode(word);
            this.parentNode.insertBefore(text, this.nextSibling);
            this.remove();
            var menu_item = $('li[tag-id="' + this.id + '"]')[0];
            menu_item.remove();
        });
    }

    replaceForHighlighted();

    $('title').on('DOMSubtreeModified', function() {
        replaceForHighlighted();
    });
}

function nbspHighlighter() {
    var css = 'highlight { padding: 0px 5px; line-height: 175%; font-size: 130%; font-weight: bold; border: red 3px solid; cursor: pointer; transition: all 0.5s} highlight:hover { background: #ff000094 } .exit-highlight { width: 25%; background: #69459C; position: fixed; bottom: 0; left: 0; z-index: 9999; } body.notranslate { width: 75%!important; margin-left: 25%; } .highlight-menu {background: #c3c3c3; width: 25%; position: absolute; height: 100%; left: 0; top: 0; box-shadow: 0 14px 28px rgb(0 0 0 / 15%), 0 10px 10px rgb(0 0 0 / 15%); } .keep-open { display: block!important; } .highlight-menu li { padding-left: 2em;text-indent: -1em;margin: 0;padding-bottom: 5px;padding-top: 5px;} .highlight-menu ul, .highlight-menu li { list-style-type: none; } .highlight-menu li:hover {background: #69459C;cursor: pointer;}',
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

    head.appendChild(style);

    style.type = 'text/css';
    if (style.styleSheet) {
        // This is required for IE8 and below.
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    };

    var exit_button = document.createElement('button');
    exit_button.setAttribute('class', 'exit-highlight');
    exit_button.innerHTML = 'Exit Highlighter';
    document.body.append(exit_button)

    $('.exit-highlight').on('click', function() {
        location.reload();
    });

    var menu = document.createElement('div');
    menu.setAttribute('class', 'highlight-menu');
    var ul = document.createElement('ul');
    menu.append(ul);
    document.body.append(menu);

    var count_unit = 0;

    function replaceForHighlighted() {
        $('.accordion-item-body').addClass('keep-open');
        $("p, .block-title-inner, .component-instruction-inner, .component-body-inner").each(function(i, text) {
            if (this.firstChild) {
                if (this.firstChild.nodeValue == String.fromCharCode(160)) {
                    var opening_tag = ' <highlight id="' + 'nbsp' + count_unit + '">';
                    this.innerHTML = opening_tag + '&nbsp;' + '</highlight>';
                }
            }
            count_unit++;
        });
        var pos_list = [];
        $('.highlight-menu ul').empty();
        $('highlight').each(function() {
            console.log(this.id);
            var link = document.createElement('a');
            link.innerHTML = 'nbsp;';
            var height = $('#' + this.id)[0].parentNode.scrollHeight
            var li = document.createElement('li');
            li.setAttribute('tag-id', this.id);
            li.setAttribute('onclick', 'scrollInPage(' + this.id + ')');
            li.append(link);
            $('.highlight-menu ul').append(li);

            console.log(height);
            if (pos_list.indexOf(height) !== -1 && height !== 0) {
                console.log(height + ' exists');
            } else if (height === 0) {
                pos_list.push(height);
            } else {
                console.log(height + ' doesnt exist, creating..');
                pos_list.push(height);
            }
        })
        $("highlight").dblclick(function() {
            var id = this.id;
            var word = this.innerHTML;
            var text = document.createTextNode(word);
            this.parentNode.insertBefore(text, this.nextSibling);
            this.remove();
            var menu_item = $('li[tag-id="' + this.id + '"]')[0];
            menu_item.remove();
        });
    }

    replaceForHighlighted();


    $('title').on('DOMSubtreeModified', function() {
        replaceForHighlighted();
    });
}

function trickleBypass() {
    var trickle_buttons = $('.trickle-button-component .trickle-button-inner button');
    var loop_length = trickle_buttons.length;
    var loop_count = 0;
    trickle_buttons.each(function() {
        loop_count++;
        $(this).removeAttr('disabled');
        this.click();
        if (loop_count === loop_length) {
            trickleDone();
        }
    })

    function trickleDone() {
        console.log('All trickle clicked');
        setTimeout(function() {
            $('body').scrollTo(0);
        }, 3000)
    }
}

function openAccordion() {
    var css = '.keep-open { display: block!important; }',
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

    head.appendChild(style);

    style.type = 'text/css';
    if (style.styleSheet) {
        // This is required for IE8 and below.
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    };

    function openAccordions() {
        $('.accordion-item-body').addClass('keep-open');
    }

    openAccordions();

    $('title').on('DOMSubtreeModified', function() {
        openAccordions();
    });
}

function verifyAccordion() {
    var css = 'highlight { padding: 0px 5px; line-height: 175%; font-size: 130%; font-weight: bold; border: red 3px solid; cursor: pointer; transition: all 0.5s} highlight:hover { background: #ff000094 } .exit-highlight { width: 25%; background: #69459C; position: fixed; bottom: 0; left: 0; z-index: 9999; } body.notranslate { width: 75%!important; margin-left: 25%; } .highlight-menu {background: #c3c3c3; width: 25%; position: absolute; height: 100%; left: 0; top: 0; box-shadow: 0 14px 28px rgb(0 0 0 / 15%), 0 10px 10px rgb(0 0 0 / 15%); } .keep-open { display: block!important; } .highlight-menu li { padding-left: 2em;text-indent: -1em;margin: 0;padding-bottom: 5px;padding-top: 5px;} .highlight-menu ul, .highlight-menu li { list-style-type: none; } .highlight-menu li:hover {background: #69459C;cursor: pointer;}',
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

    head.appendChild(style);

    style.type = 'text/css';
    if (style.styleSheet) {
        // This is required for IE8 and below.
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    };

    var exit_button = document.createElement('button');
    exit_button.setAttribute('class', 'exit-highlight');
    exit_button.innerHTML = 'Exit Accordion Checker';
    document.body.append(exit_button)

    $('.exit-highlight').on('click', function() {
        location.reload();
    });

    var menu = document.createElement('div');
    menu.setAttribute('class', 'highlight-menu');
    var ul = document.createElement('ul');
    menu.append(ul);
    document.body.append(menu);

    function hasDuplicates(array) {
        return (new Set(array)).size !== array.length;
    }

    function replaceForHighlighted() {
        var count_limit = 0;
        var count_duplicate = 0;
        var count_compliant = 0;
        $('.highlight-menu ul').empty();
        $('.accordion-widget').each(function(i, element) {
            if (element.children.length > 8) {
                count_limit++;
            }
            var titles_array = [];
            Array.from(element.children).forEach(function(data) {
                titles_array.push(data.children[0].children[0].innerText);
            });
            if (hasDuplicates(titles_array)) {
                count_duplicate++;
            }
            if (element.children.length <= 8 && hasDuplicates(titles_array) === false) {
                count_compliant++;
            }
        })
        var link_1 = document.createElement('a');
        link_1.innerHTML = count_compliant + ' compliant accordions';
        var li_1 = document.createElement('li');
        li_1.append(link_1);
        $('.highlight-menu ul').append(li_1);
        var link_2 = document.createElement('a');
        link_2.innerHTML = count_limit + ' accordions over limit';
        var li_2 = document.createElement('li');
        li_2.append(link_2);
        $('.highlight-menu ul').append(li_2);
        var link_3 = document.createElement('a');
        link_3.innerHTML = count_duplicate + ' accordions with non-unique titles';
        var li_3 = document.createElement('li');
        li_3.append(link_3);
        $('.highlight-menu ul').append(li_3);
    }

    replaceForHighlighted();

    $('title').on('DOMSubtreeModified', function() {
        replaceForHighlighted();
    });


}

function scrollInPage(id) {
    $('body').scrollTo(id);
}
