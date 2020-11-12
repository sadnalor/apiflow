class SearchablePicklist {
    constructor(settings) {
        this.valueList = settings.valueList;
        this.filteredValueList = this.valueList.map(value => {return {value: value, score: 0, highlighted: false}});
        this.rankedList = this.filteredValueList;
        this.step = settings.step;
        this.changeHandler = settings.changeHandler;
        this.flowBuilderUI = settings.flowBuilderUI;
        this.uuid = this.generateUUID();
        this.classUniqueString = "roland-component-searchable-picklist";
        this.searchInputId = settings.id; //"search-input-" + this.uuid;
        this.searchInputClass = "search-input-" + this.classUniqueString;
        this.listElementClass = "list-element-" + this.classUniqueString;
        this.listClass = "list-" + this.classUniqueString;
        this.highlightedListElementClass = "highlighted-list-element-" + this.classUniqueString;
        this.listId = "list-" + this.uuid;
        this.dimmerId = "dimmer-" + this.uuid;
        this.topOffset = 6;
        this.widthOffset = -2 + 14; //-2 for borders and 10 for padding
        
    }

    getHtml = () => {
        return this.searchInput(this.step.name);
    }

    searchInput = preselectedValue => {
        $(document).off("focus", "#" + this.searchInputId).on("focus", "#" + this.searchInputId, e => {
            $("#" + e.target.id).val("");
            this.drawList(e);
        });
        $(document).off("blur", "#" + this.searchInputId).on("blur", "#" + this.searchInputId, e => {
            setTimeout(() => {
                $("#" + this.listId).remove();
                this.flowBuilderUI.render(this.flowBuilderUI.targetDivId);
            }, 1000);  //timeout needed to allow click event to trigger before the deletion of the list 
        });
        return `<input id="${this.searchInputId}" class="${this.searchInputClass}" placeholder='E.g. "Clarizen", "Create", "Delete", "Login", "Go", "Variable"' style="width:20em;height:3em;" type="text" value="${preselectedValue}">`;
    }

    dimmer = show => {
        if (show) {
            $('body').append(`<div id="${this.dimmerId}" style="cursor:pointer;z-index:9990;position:fixed;top:0px;width:100%;height:100%;background:rgba(0, 0, 0, 0.2);"></div>`);
        } else {
            $("#" + this.dimmerId).remove();
        }
    }

    drawList = e => {
        let target = $("#" + e.target.id), top, left, height, width;
        try {
            top = target.offset().top;
            left = target.offset().left;
            height = target.height();
            width = target.width();
        } catch(err) {
            console.log(err);
        }
        let settings = {
            top: top,
            left: left,
            height: height,
            width: width
        },
        html = this.listHtml(settings),
        topLevelEvent = e;
        $('body').append(html);
        $(".content-div-roland-component-popup").scroll(e => {
                top = target.offset().top;                
                $("#" + this.listId).css("top", (top + height + this.topOffset) + "px");
        });
        $(document).off("keyup", "#" + this.searchInputId).on("keyup", "#" + this.searchInputId, e => {
            this.keywordSearch($("#" + this.searchInputId).val());
            $("#" + this.listId).remove();
            let showList = true;
            switch (e.keyCode) {
                case 38:
                    this.highlightListElement(false);
                    break;
                case 40:
                    this.highlightListElement(true);
                    break;
                case 39:
                    this.highlightListElement(true);
                    break;
                case 37:
                    this.highlightListElement(false);
                    break;
                case 27:
                    $("#" + this.listId).remove();
                    showList = false;
                    this.flowBuilderUI.render(this.flowBuilderUI.targetDivId);
                    break; 
                case 13:
                    this.pickHighlighted();
                    showList = false;
                    break;    
            }
            if (showList) {
                this.drawList(topLevelEvent);
            }
        });
        $(document).off("mouseenter", "." + this.listElementClass).on("mouseenter", "." + this.listElementClass, e => {
            $("." + this.highlightedListElementClass).removeClass(this.highlightedListElementClass);
        });
        $(document).off("click", "." + this.listElementClass).on("click", "." + this.listElementClass, e => {
            $("#" + this.searchInputId).val($("#" + e.target.id).attr("data-id"));
            $("#" + this.searchInputId).attr("value", $("#" + e.target.id).attr("data-id"));
            let element = document.getElementById(this.searchInputId);
            let event = new Event('change');
            element.dispatchEvent(event);
        });
        $("#" + this.searchInputId).off("change").on("change", e => {
            try {this.changeHandler(e);} catch {}
        });

    }

    pickHighlighted = () => {
        let highlighted = null;
        for (let i in this.rankedList) {
            if (this.rankedList[i].highlighted) {
                highlighted = this.rankedList[i];
            }
        }
        $("#" + this.searchInputId).val(highlighted.value);
        $("#" + this.searchInputId).attr("value", highlighted.value);
        let element = document.getElementById(this.searchInputId);
        let event = new Event('change');
        element.dispatchEvent(event);
    }

    highlightListElement = next => {
        let currentlyHighlighted = null,
        currentlyHighlightedIndex = null;
        for (let i in this.rankedList) {
            if (this.rankedList[i].highlighted === true) {
                currentlyHighlighted = this.rankedList[i];
                currentlyHighlightedIndex = i;
                break;
            }
        }
        if (currentlyHighlighted === null) {
            if (next) {
                
                this.rankedList[0]["highlighted"] = true;
            } else {
                this.rankedList[this.rankedList.length - 1]["highlighted"] = true;
            }
        } else {
            for (let j in this.rankedList) {
                this.rankedList[j].highlighted = false;
            }
            if (next) {
                try {
                    this.rankedList[parseInt(currentlyHighlightedIndex) + 1].highlighted = true;
                } catch {
                    this.rankedList[0].highlighted = true;
                }
            } else {
                try {
                    this.rankedList[currentlyHighlightedIndex - 1].highlighted = true;
                } catch {
                    this.rankedList[this.rankedList.length - 1].highlighted = true;
                }
            }
        }
    }


    keywordSearch = keywordString => {
        this.rankedList = [];
        let keywords = keywordString.split(" ");
        keywords = keywords.filter(element => element != "");
        for (let i in this.filteredValueList) {
            this.filteredValueList[i].score = this.searchScore(keywords, keywordString, this.filteredValueList[i].value);
            if (this.filteredValueList[i].score > 0) {
                this.rankedList.push(this.filteredValueList[i]);
            }
        }
        this.rankedList = this.sortByScore(this.rankedList);
    }

    sortByScore = list => {
        return list.sort((a, b) => b.score - a.score);
    }

    searchScore = (keywords, keywordString, record) => {
        let score = 0;
        for (let i in keywords) {
            if (record.toLowerCase().includes(keywords[i].toLowerCase())) {
                score ++;
            }
        }
        if (record.toLowerCase().includes(keywordString.toLowerCase())) {
            score += 2;
        }
        return score;
    }

    listHtml = settings => {
        let html = `<div id="${this.listId}" class="${this.listClass}" data-id="" style="top:${settings.top + settings.height + this.topOffset}px;width:${settings.width + this.widthOffset}px;left:${settings.left}px;">`;
        for (let i in this.rankedList) {
            html += this.optionHtml(this.rankedList[i]);
        }
        if (this.rankedList.length === 0) {
            html += this.optionHtml({value: "No results", score: 0, highlighted: false});
        }
        html += `</div>`;
        return html;
    }

    optionHtml = (element) => {
        return `<div id="${this.listElementClass + "-" + element.value.replace(/ /g, "")}" class="${this.listElementClass} ${element.highlighted ? this.highlightedListElementClass : ""}" data-id="${element.value}">${element.value}</div>`;
    }

    generateUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}