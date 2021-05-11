!(function(a) {
    "use strict";
    var b,
        c,
        d,
        e,
        f = window.LandingPressKitData || {};
    (c = {
        LibraryLayoutView: null,
        LibraryHeaderView: null,
        LibraryLoadingView: null,
        LibraryInsertingView: null,
        LibraryErrorView: null,
        LibraryBodyView: null,
        LibraryCollectionView: null,
        LibraryTabsCollectionView: null,
        LibraryTabsItemView: null,
        LibraryTemplateItemView: null,
        LibraryInsertTemplateBehavior: null,
        LibraryTabsCollection: null,
        LibraryCollection: null,
        LibraryTemplateModel: null,
        TabModel: null,
        CategoriesModel: null,
        CategoriesView: null,
        KeywordsModel: null,
        KeywordsView: null,
        SearchModel: null,
        SearchView: null,
        LibraryPreviewView: null,
        LibraryHeaderBack: null,
        LibraryHeaderInsertButton: null,
        init: function() {
            var a = this;
            (a.LibraryTemplateModel = Backbone.Model.extend({
                defaults: {
                    template_id: 0,
                    name: "",
                    title: "",
                    thumbnail: "",
                    preview: "",
                    source: "",
                    categories: [],
                    keywords: []
                }
            })),
            (a.TabModel = Backbone.Model.extend({
                defaults: {
                    slug: "",
                    title: ""
                }
            })),
            (a.CategoriesModel = Backbone.Model.extend({
                defaults: {
                    categories: {}
                }
            })),
            (a.KeywordsModel = Backbone.Model.extend({
                defaults: {
                    keywords: {}
                }
            })),
            (a.SearchModel = Backbone.Model.extend({
                defaults: {
                    search: ""
                }
            })),
            (a.LibraryCollection = Backbone.Collection.extend({
                model: a.LibraryTemplateModel
            })),
            (a.LibraryTabsCollection = Backbone.Collection.extend({
                model: a.TabModel
            })),
            (a.LibraryLoadingView = Marionette.ItemView.extend({
                id: "mockpress-template-library-loading",
                template: "#tmpl-mockpress-template-library-loading"
            })),
            (a.LibraryInsertingView = Marionette.ItemView.extend({
                id: "mockpress-template-library-inserting",
                template: "#tmpl-mockpress-template-library-inserting"
            })),
            (a.LibraryErrorView = Marionette.ItemView.extend({
                id: "mockpress-template-library-error",
                template: "#tmpl-mockpress-template-library-error"
            })),
            (a.CategoriesView = Marionette.ItemView.extend({
                id: "mockpress-template-library-categories",
                template: "#tmpl-mockpress-template-library-categories",
                ui: {
                    categories: ".mockpress-library-categories"
                },
                events: {
                    "change @ui.categories": "onSelectCategory"
                },
                onSelectCategory: function(a) {
                    var c = a.currentTarget.selectedOptions[0].value;
                    b.setFilter("category", c);
                },
            })),
            (a.KeywordsView = Marionette.ItemView.extend({
                id: "mockpress-template-library-keywords",
                template: "#tmpl-mockpress-template-library-keywords",
                ui: {
                    keywords: ".mockpress-library-keywords"
                },
                events: {
                    "change @ui.keywords": "onSelectKeyword"
                },
                onSelectKeyword: function(a) {
                    var c = a.currentTarget.selectedOptions[0].value;
                    b.setFilter("keyword", c);
                },
            })),
            (a.SearchView = Marionette.ItemView.extend({
                id: "mockpress-template-library-search",
                template: "#tmpl-mockpress-template-library-search",
                ui: {
                    search: "#mockpress-library-search"
                },
                events: {
                    "input @ui.search": "onTypeSearch"
                },
                onTypeSearch: function(a) {
                    var c;
                    clearTimeout(c),
                        (c = setTimeout(function() {
                            var c = a.currentTarget.value.toLowerCase();
                            b.setFilter("search", c);
                        }, 1500));
                },
            })),
            (a.LibraryHeaderView = Marionette.LayoutView.extend({
                id: "mockpress-template-library-header",
                template: "#tmpl-mockpress-template-library-header",
                ui: {
                    closeModal: "#mockpress-template-library-header-close-modal"
                },
                events: {
                    "click @ui.closeModal": "onCloseModalClick"
                },
                regions: {
                    headerTabs: "#mockpress-template-library-header-tabs",
                    headerActions: "#mockpress-template-library-header-actions"
                },
                onCloseModalClick: function() {
                    b.closeModal();
                },
            })),
            (a.LibraryPreviewView = Marionette.ItemView.extend({
                template: "#tmpl-mockpress-template-library-preview",
                id: "mockpress-template-library-preview",
                ui: {
                    iframe: "> iframe"
                },
                onRender: function() {
                    this.ui.iframe.attr("src", this.getOption("preview"));
                },
            })),
            (a.LibraryHeaderBack = Marionette.ItemView.extend({
                template: "#tmpl-mockpress-template-library-header-back",
                id: "mockpress-template-library-header-back",
                ui: {
                    button: "button"
                },
                events: {
                    "click @ui.button": "onBackClick"
                },
                onBackClick: function() {
                    b.setPreview("back");
                },
            })),
            (a.LibraryInsertTemplateBehavior = Marionette.Behavior.extend({
                ui: {
                    insertButton: ".mockpress-template-library-template-insert"
                },
                events: {
                    "click @ui.insertButton": "onInsertButtonClick"
                },
                onInsertButtonClick: function() {
                    var a = this.view.model,
                        c = {};
                    b.layout.showInsertingView(),
                        elementor.templates.requestTemplateContent(a.get("source"), a.get("template_id"), {
                            data: {
                                tab: b.getTab(),
                                page_settings: !0
                            },
                            success: function(d) {
                                if (d.errors) {
                                    var e = "";
                                    _.each(d.errors, function(a) {
                                            e += a + ". ";
                                        }),
                                        e || (e = "ERROR - Error message is empty!"),
                                        alert(e);
                                }
                                null !== b.atIndex && (c.at = b.atIndex), $e.run("document/elements/import", {
                                    model: a,
                                    data: d,
                                    options: c
                                }), (b.atIndex = null), b.closeModal();
                            },
                        });
                },
            })),
            (a.LibraryHeaderInsertButton = Marionette.ItemView.extend({
                template: "#tmpl-mockpress-template-library-insert-button",
                id: "mockpress-template-library-insert-button",
                behaviors: {
                    insertTemplate: {
                        behaviorClass: a.LibraryInsertTemplateBehavior
                    }
                },
            })),
            (a.LibraryTemplateItemView = Marionette.ItemView.extend({
                template: "#tmpl-mockpress-template-library-item",
                className: function() {
                    var a = " mockpress-template-has-url",
                        b = " elementor-template-library-template-";
                    return "" === this.model.get("url") && (a = " mockpress-template-no-url"), (b += "remote"), "elementor-template-library-template" + b + a;
                },
                ui: function() {
                    return {
                        previewButton: ".elementor-template-library-template-preview"
                    };
                },
                events: function() {
                    return {
                        "click @ui.previewButton": "onPreviewButtonClick"
                    };
                },
                onPreviewButtonClick: function() {
                    "" !== this.model.get("url") && b.setPreview(this.model);
                },
                behaviors: {
                    insertTemplate: {
                        behaviorClass: a.LibraryInsertTemplateBehavior
                    }
                },
            })),
            (a.LibraryTabsItemView = Marionette.ItemView.extend({
                template: "#tmpl-mockpress-template-library-tabs-item",
                className: function() {
                    return "elementor-template-library-menu-item";
                },
                ui: function() {
                    return {
                        tabsLabels: "label",
                        tabsInput: "input"
                    };
                },
                events: function() {
                    return {
                        "click @ui.tabsLabels": "onTabClick"
                    };
                },
                onRender: function() {
                    this.model.get("slug") === b.getTab() && this.ui.tabsInput.attr("checked", "checked");
                },
                onTabClick: function(a) {
                    var c = jQuery(a.target);
                    b.setTab(c.val()), b.setFilter("category", ""), b.setFilter("keyword", ""), b.setFilter("search", "");
                },
            })),
            (a.LibraryCollectionView = Marionette.CompositeView.extend({
                template: "#tmpl-mockpress-template-library-templates",
                id: "mockpress-template-library-templates",
                childViewContainer: "#mockpress-template-library-templates-container",
                initialize: function() {
                    this.listenTo(b.channels.templates, "filter:change", this._renderChildren);
                },
                filter: function(a) {
                    var c = b.getFilter("category"),
                        d = b.getFilter("keyword"),
                        e = b.getFilter("search");
                    return e ?
                        c || d ?
                        d && !c ?
                        _.contains(a.get("keywords"), d) && a.get("title").toLowerCase().includes(e) :
                        c && !d ?
                        _.contains(a.get("categories"), c) && a.get("title").toLowerCase().includes(e) :
                        _.contains(a.get("categories"), c) && _.contains(a.get("keywords"), d) && a.get("title").toLowerCase().includes(e) :
                        a.get("title").toLowerCase().includes(e) :
                        (!c && !d) || (d && !c ? _.contains(a.get("keywords"), d) : c && !d ? _.contains(a.get("categories"), c) : _.contains(a.get("categories"), c) && _.contains(a.get("keywords"), d));
                },
                getChildView: function(b) {
                    return a.LibraryTemplateItemView;
                },
                onRenderCollection: function() {
                    this.$childViewContainer, this.$childViewContainer.children(), b.getTab();
                },
            })),
            (a.LibraryTabsCollectionView = Marionette.CompositeView.extend({
                template: "#tmpl-mockpress-template-library-tabs",
                childViewContainer: "#mockpress-template-library-tabs-items",
                initialize: function() {
                    this.listenTo(b.channels.layout, "tamplate:cloned", this._renderChildren);
                },
                getChildView: function(b) {
                    return a.LibraryTabsItemView;
                },
            })),
            (a.LibraryBodyView = Marionette.LayoutView.extend({
                id: "mockpress-template-library-content",
                className: function() {
                    return "library-tab-" + b.getTab();
                },
                template: "#tmpl-mockpress-template-library-content",
                regions: {
                    contentTemplates: ".mockpress-templates-list",
                    contentCategories: ".mockpress-categories-list",
                    contentKeywords: ".mockpress-keywords-list",
                    contentSearch: ".mockpress-search"
                },
            })),
            (a.LibraryLayoutView = Marionette.LayoutView.extend({
                el: "#mockpress-template-library-modal",
                regions: f.modalRegions,
                initialize: function() {
                    this.getRegion("modalHeader").show(new a.LibraryHeaderView()), this.listenTo(b.channels.tabs, "filter:change", this.switchTabs), this.listenTo(b.channels.layout, "preview:change", this.switchPreview);
                },
                switchTabs: function() {
                    this.showLoadingView(), b.setFilter("category", ""), b.setFilter("keyword", ""), b.setFilter("search", ""), b.requestTemplates(b.getTab());
                },
                switchPreview: function() {
                    var c = this.getHeaderView(),
                        d = b.getPreview();
                    return "back" === d ?
                        (c.headerTabs.show(new a.LibraryTabsCollectionView({
                            collection: b.collections.tabs
                        })), c.headerActions.empty(), void b.setTab(b.getTab())) :
                        "initial" === d ?
                        void c.headerActions.empty() :
                        (this.getRegion("modalContent").show(new a.LibraryPreviewView({
                                preview: d.get("url")
                            })),
                            c.headerTabs.show(new a.LibraryHeaderBack()),
                            void c.headerActions.show(new a.LibraryHeaderInsertButton({
                                model: d
                            })));
                },
                getHeaderView: function() {
                    return this.getRegion("modalHeader").currentView;
                },
                getContentView: function() {
                    return this.getRegion("modalContent").currentView;
                },
                showLoadingView: function() {
                    this.modalContent.show(new a.LibraryLoadingView());
                },
                showInsertingView: function() {
                    this.modalContent.show(new a.LibraryInsertingView());
                },
                showTemplatesView: function(c, d, e) {
                    this.getRegion("modalContent").show(new a.LibraryBodyView());
                    var f = this.getContentView(),
                        g = this.getHeaderView(),
                        h = new a.CategoriesModel({
                            categories: d
                        }),
                        i = new a.KeywordsModel({
                            keywords: e
                        }),
                        j = new a.SearchModel({
                            search: ""
                        });
                    (b.collections.tabs = new a.LibraryTabsCollection(b.getTabs())),
                    g.headerTabs.show(new a.LibraryTabsCollectionView({
                            collection: b.collections.tabs
                        })),
                        f.contentTemplates.show(new a.LibraryCollectionView({
                            collection: c
                        })),
                        f.contentCategories.show(new a.CategoriesView({
                            model: h
                        })),
                        this.$(".mockpress-library-categories").length && this.$(".mockpress-library-categories").select2({
                            width: 275
                        }),
                        this.$(".mockpress-library-keywords").length && (f.contentKeywords.show(new a.KeywordsView({
                            model: i
                        })), this.$(".mockpress-library-keywords").select2({
                            width: 275
                        })),
                        f.contentSearch.show(new a.SearchView({
                            model: j
                        }));
                },
            }));
        },
        masonry: {
            self: {},
            elements: {},
            init: function(b) {
                var c = this;
                (c.settings = a.extend(c.getDefaultSettings(), b)), (c.elements = c.getDefaultElements()), c.run();
            },
            getSettings: function(a) {
                return a ? this.settings[a] : this.settings;
            },
            getDefaultSettings: function() {
                return {
                    container: null,
                    items: null,
                    columnsCount: 3,
                    verticalSpaceBetween: 30
                };
            },
            getDefaultElements: function() {
                return {
                    $container: jQuery(this.getSettings("container")),
                    $items: jQuery(this.getSettings("items"))
                };
            },
            run: function() {
                var a = [],
                    b = this.elements.$container.position().top,
                    c = this.getSettings(),
                    d = c.columnsCount;
                (b += parseInt(this.elements.$container.css("margin-top"), 10)),
                this.elements.$container.height(""),
                    this.elements.$items.each(function(e) {
                        var f = Math.floor(e / d),
                            g = e % d,
                            h = jQuery(this),
                            i = h.position(),
                            j = h[0].getBoundingClientRect().height + c.verticalSpaceBetween;
                        if (f) {
                            var k = i.top - b - a[g];
                            (k -= parseInt(h.css("margin-top"), 10)), (k *= -1), h.css("margin-top", k + "px"), (a[g] += j);
                        } else a.push(j);
                    }),
                    this.elements.$container.height(Math.max.apply(Math, a));
            },
        },
    }),
    (d = {
        LandingPressKitSearchView: null,
        init: function() {
            var b = this;
            (b.LandingPressKitSearchView = window.elementor.modules.controls.BaseData.extend({
                hasTitles: !1,
                getAjaxUrl: function(b, c) {
                    var d = "";
                    return (
                        c.length > 0 &&
                        a.each(c, function(a, b) {
                            window.elementor.settings.page.model.attributes[b] && (d += "&" + b + "=" + window.elementor.settings.page.model.attributes[b]);
                        }),
                        ajaxurl + "?action=" + b + d
                    );
                },
                onReady: function() {
                    var b = this,
                        c = this.model.attributes.action,
                        d = this.model.attributes.query_params;
                    this.ui.select.find("option").each(function(b, c) {
                            a(this).attr("selected", !0);
                        }),
                        this.ui.select.select2({
                            ajax: {
                                url: function() {
                                    return b.getAjaxUrl(c, d);
                                },
                                dataType: "json",
                            },
                            placeholder: "Please enter 3 or more characters",
                            minimumInputLength: 3,
                            allowClear: !0,
                        }),
                        this.hasTitles || this.getOptionsTitles();
                },
                getOptionsTitles: function() {
                    var b = this,
                        c = this.model.attributes.action,
                        d = this.model.attributes.query_params,
                        e = this.getControlValue();
                    if (e) {
                        a.isArray(e) && (e = e.join());
                        var f = b.getAjaxUrl(c, d) + "&ids=" + e;
                        a.ajax({
                            url: f,
                            dataType: "json",
                            beforeSend: function() {
                                b.ui.select.prop("disabled", !0);
                            },
                            success: function(a) {
                                (b.hasTitles = !0), b.model.set("saved", b.prepareOptions(a.results)), b.render();
                            },
                        });
                    }
                },
                prepareOptions: function(b) {
                    var c = {};
                    return (
                        a.each(b, function(a, b) {
                            c[b.id] = b.text;
                        }),
                        c
                    );
                },
                onBeforeDestroy: function() {
                    this.ui.select.data("select2") && this.ui.select.select2("destroy"), this.$el.remove();
                },
            })),
            window.elementor.addControlView("landingpresskit_search", b.LandingPressKitSearchView);
        },
    }),
    (e = {
        getDataToSave: function(a) {
            return (a.id = window.elementor.config.post_id), a;
        },
        init: function() {
            window.elementor.settings.landingpresskit_template && (window.elementor.settings.landingpresskit_template.getDataToSave = this.getDataToSave),
                window.elementor.settings.landingpresskit_page &&
                ((window.elementor.settings.landingpresskit_page.getDataToSave = this.getDataToSave),
                    (window.elementor.settings.landingpresskit_page.changeCallbacks = {
                        custom_header: function() {
                            this.save(function() {
                                elementor.reloadPreview(),
                                    elementor.once("preview:loaded", function() {
                                        elementor.getPanelView().setPage("landingpresskit_page_settings");
                                    });
                            });
                        },
                        custom_footer: function() {
                            this.save(function() {
                                elementor.reloadPreview(),
                                    elementor.once("preview:loaded", function() {
                                        elementor.getPanelView().setPage("landingpresskit_page_settings");
                                    });
                            });
                        },
                    }));
        },
    }),
    (b = {
        modal: !1,
        layout: !1,
        collections: {},
        tabs: {},
        defaultTab: "",
        channels: {},
        atIndex: null,
        init: function() {
            window.elementor.on("preview:loaded", window._.bind(b.onPreviewLoaded, b)), c.init(), d.init();
            var e = a("#tmpl-elementor-add-section");
            if (0 < e.length && void 0 !== typeof elementor) {
                var f = e.text();
                (f = f.replace(
                    '<div class="elementor-add-section-drag-title',
                    '<div class="elementor-add-section-area-button elementor-add-mockpress-button add-mockpress-template" title="MockPress Template"><svg width="78" height="20" viewBox="0 0 161 42" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                    '<path d="M22.6486 12.8843C22.6043 10.2728 22.5156 7.66126 22.4713 5.04973C22.4713 4.69563 22.56 4.38579 22.56 4.03168C22.6043 2.79231 22.8702 1.50868 21.7622 0.313579C21.5406 0.269313 21.1418 0.0922631 20.7872 0.0922631C19.6793 0.0479979 18.5713 0.00373535 17.4633 0.00373535C16.7099 -0.0405272 16.0894 0.313579 15.6019 0.800472C14.2724 2.03984 13.0315 3.32347 12.0121 4.78415C11.8792 4.9612 11.7462 5.094 11.5689 5.27105C11.4803 5.13826 11.436 5.13826 11.3917 5.04973C10.6382 3.54479 9.39733 2.39394 8.33368 1.06605C7.89049 0.490631 7.31435 0.180788 6.51661 0.269313C6.42798 0.313579 6.29502 0.269313 6.16206 0.269313C5.09842 0.269313 4.03477 0.225051 2.9268 0.225051C2.21771 0.225051 1.7302 0.623419 1.50861 1.2431C1.28701 1.73 1.10974 2.21689 1.06542 2.74805C0.888146 3.94315 0.799508 5.18252 0.710871 6.42189C0.577915 8.50226 0.489278 10.5826 0.400641 12.6187C0.267685 14.8761 0.00177275 17.1336 0.00177275 19.391C0.00177275 24.1271 -0.0425459 28.8633 0.312003 33.5552C0.400641 34.7503 1.0211 35.5913 2.08475 36.0339C2.79385 36.2995 3.54726 36.4766 4.30068 36.5651C5.27569 36.7421 6.20638 36.3438 7.13707 35.9897C7.49162 35.8569 7.71322 35.5913 7.80185 35.2372C7.84617 34.9273 7.89049 34.6175 7.89049 34.3077C8.02345 32.0945 8.11209 29.8371 8.20072 27.6239C8.24504 25.9862 8.378 24.3485 8.378 22.7107C8.42232 19.7894 8.378 16.8237 8.33368 13.9024C8.33368 13.3712 8.33368 12.7958 8.28936 12.2646C8.378 12.2204 8.42232 12.2204 8.46663 12.2204C8.73255 12.663 8.99846 13.1056 9.30869 13.5483C9.5746 14.0351 9.88483 14.522 10.2394 14.9647C10.9042 15.8057 11.8349 15.7614 12.4996 14.9204C13.1201 14.1237 13.7406 13.3269 14.4053 12.5302C14.494 12.3974 14.5826 12.3531 14.7599 12.1761C14.6712 13.0171 14.5826 13.7253 14.5383 14.4335C14.4497 17.0893 14.3167 19.7451 14.361 22.4009C14.361 25.3222 14.494 28.2436 14.4053 31.1207C14.361 33.7765 14.4497 36.388 14.5383 39.0438C14.5383 39.3979 14.5826 39.7963 14.6712 40.1504C14.9815 41.0357 15.8678 41.6553 16.7985 41.8324C17.552 42.0094 18.5713 42.098 19.3247 41.8324C19.9008 41.6553 20.6986 41.434 21.1418 41.0357C21.7622 40.5045 21.8065 39.575 21.9838 38.8225C22.2497 37.7602 22.2497 36.6093 22.2941 35.5028C22.3827 33.2453 22.2941 30.9879 22.427 28.7305C22.5156 26.3403 22.7372 23.9501 22.7816 21.5599C22.7816 18.6828 22.6929 15.8057 22.6486 12.8843Z" fill="#F85D5D"/>' +
                    '<path d="M38.8762 31.4306C38.9205 31.165 38.9648 30.8994 39.0091 30.6781C39.5409 27.7125 39.4523 24.7911 39.5852 21.8255C39.5852 20.7189 39.6739 19.568 39.7182 18.4172C39.7625 17.7532 39.8068 17.045 39.8512 16.3368C39.8512 14.9204 39.8512 13.4597 39.8512 12.0433C39.8955 11.4679 39.9841 10.8482 39.9398 10.317C39.8068 9.34326 39.6296 8.36947 39.408 7.43994C39.275 6.90878 39.0534 6.42189 38.8762 5.89073C38.6546 5.40384 38.2557 5.04973 37.7239 4.87268C36.9704 4.69563 36.217 4.51857 35.4636 4.43005C34.5329 4.29726 33.6022 4.253 32.6715 4.16447C31.1204 3.98742 29.5692 4.07594 28.0181 4.20873C27.0874 4.29726 26.201 4.69563 25.7135 5.58089C25.359 6.15631 25.0931 6.82026 24.8271 7.4842C24.6942 7.74978 24.6499 8.05963 24.6055 8.36947C24.5612 9.29899 24.5169 10.2728 24.4726 11.2023C24.384 12.5302 24.251 13.8138 24.1624 15.1417C24.0294 16.8237 23.8521 18.5057 23.8078 20.232C23.7192 22.4451 23.6749 24.6583 23.6749 26.8715C23.6749 28.1551 23.6749 29.4387 23.9851 30.6781C24.2953 31.9174 24.9158 33.1126 26.0237 33.8208C26.9988 34.4847 28.284 34.6618 29.4806 34.5732C30.6772 34.529 31.8738 34.2634 33.0704 34.1749C34.0897 34.1306 35.1091 34.1306 36.1284 33.9536C37.6795 33.6437 38.5216 32.9355 38.8762 31.4306ZM33.0261 12.2204C33.3806 13.1056 33.425 14.0794 33.4693 15.0089C33.5579 16.6909 33.6465 18.3729 33.6909 20.0549C33.7352 20.9402 33.6465 21.8255 33.6022 22.7107C33.6022 23.3304 33.6465 23.9501 33.6022 24.614C33.6022 25.278 33.6022 25.9419 33.5136 26.6059C33.4693 27.0928 33.159 27.3141 32.7602 27.4911C32.4056 27.6239 32.0511 27.7125 31.6965 27.801C31.1647 27.8895 30.4556 27.4026 30.4113 26.8272C30.3227 26.119 30.3227 25.3665 30.367 24.6583C30.4113 22.6222 30.6772 20.5861 30.5442 18.55C30.4556 17.709 30.4113 16.8237 30.4113 15.9827C30.4113 15.0532 30.4556 14.1679 30.4999 13.2827C30.4999 12.3531 31.1204 11.7335 32.0511 11.7777C32.4499 11.7777 32.7602 11.8663 33.0261 12.2204Z" fill="#F85D5D"/>' +
                    '<path d="M50.8287 11.1138C50.9173 12.0433 51.0503 12.9728 50.873 13.8581C50.7844 14.4335 50.8287 15.0089 51.2719 15.4073C51.7594 15.8057 52.3355 16.0713 53.0003 16.0713C53.931 16.027 54.8174 15.7171 55.6594 15.2745C56.5901 14.7876 57.0776 13.9909 57.0333 12.8843C56.989 9.83015 57.8753 5.84647 54.2855 4.47431C53.0003 3.98742 51.6264 3.94315 50.2525 3.89889C47.815 3.85463 45.0229 3.36773 42.807 4.6071C42.4081 4.82842 42.1422 5.13826 41.965 5.58089C41.4331 7.04157 41.5218 8.90062 41.3445 10.4941C41.1672 12.4417 41.0343 14.3893 40.9456 16.3368C40.8127 20.1435 40.9456 23.9501 41.3888 27.7567C41.5218 29.1731 41.699 30.5896 42.2752 31.8289C42.8513 33.1126 43.8707 34.2634 45.2445 34.706C45.9536 34.9273 46.7514 34.9273 47.5048 34.9273C50.2525 34.9716 53.3105 35.37 55.9253 34.2191C56.5458 33.9536 56.989 33.5109 57.2992 32.9355C57.6981 32.183 57.6537 31.4306 57.6094 30.6338C57.6094 29.8813 57.5651 29.0846 57.6094 28.3321C57.6537 27.3583 57.6094 26.3846 57.4322 25.4108C57.2106 24.1714 56.4128 23.3747 55.2162 23.1533C54.1083 22.932 53.0889 23.1533 52.1139 23.6845C51.6707 23.9058 51.4935 24.3042 51.5378 24.7911C51.5378 25.5878 51.5378 26.3403 51.5378 27.0928C51.5378 27.4469 51.4491 27.7567 51.1832 27.978C50.6957 27.978 50.1639 27.978 49.6764 27.978C48.8787 27.9338 48.3912 27.4911 48.3025 26.6944C48.2582 26.0747 48.2582 25.4993 48.2582 24.8796C48.2139 23.4632 48.2582 22.0025 48.1696 20.5861C48.1252 19.5238 47.9036 18.4615 47.8593 17.3991C47.7707 15.8499 47.7264 14.3007 47.6821 12.7515C47.6821 12.3089 47.7707 11.9105 47.9923 11.5121C48.8787 11.0695 49.8093 11.0695 50.8287 11.1138Z" fill="#F85D5D"/>' +
                    '<path d="M65.4279 4.51857C65.0733 4.43005 64.7188 4.29726 64.3642 4.253C63.3892 4.20873 62.3699 4.16447 61.3949 4.16447C60.8187 4.12021 60.3755 4.47431 60.1539 4.9612C59.9767 5.40384 59.7994 5.84647 59.7551 6.33336C59.5778 7.30715 59.4892 8.28094 59.4005 9.25473C59.2676 11.2466 59.2233 13.1941 59.0017 15.1417C58.8244 16.8237 58.6914 18.5057 58.6471 20.1877C58.5585 24.2157 58.4698 28.1993 58.7357 32.183C58.7801 33.1568 59.2232 33.8208 60.0653 34.2634C60.9074 34.706 61.7937 34.7946 62.6801 34.706C63.1676 34.6618 63.6108 34.5732 64.054 34.529C64.6301 34.4404 65.029 34.1306 65.2063 33.5552C65.2506 33.3781 65.2949 33.1568 65.2949 32.9798C65.3392 32.1388 65.4279 31.2978 65.4279 30.4568C65.4279 28.6862 65.0733 26.5616 65.4279 24.8353C65.9597 25.0124 66.2256 25.9419 66.4915 26.4288C66.8904 27.2256 67.2892 27.978 67.6438 28.7305C68.4415 30.2797 69.2393 31.8289 70.037 33.3781C70.2143 33.7322 70.4359 34.1306 70.7461 34.4404C71.3666 34.9273 72.2086 34.9273 72.962 34.9273C74.07 34.8831 75.1336 34.8388 76.1973 34.7503C76.4189 34.706 76.5962 34.706 76.7734 34.6175C76.995 34.4847 77.128 34.2634 77.2166 34.0421C77.6155 33.0683 77.128 31.9174 76.5962 30.9879C75.7541 29.3502 74.7791 27.7125 74.07 25.9862C73.6268 25.0567 73.1836 24.0829 72.6961 23.1533C72.4302 22.7107 72.12 22.3124 71.8541 21.8697C71.0563 20.4976 70.3029 19.1254 69.5052 17.6647C69.8154 17.2664 70.1256 16.8237 70.5245 16.3811C71.3666 15.4516 72.0757 14.3893 72.7404 13.2827C73.1393 12.5745 73.6268 11.9105 74.1586 11.2466C74.6905 10.6269 75.178 9.91868 75.6211 9.1662C76.153 8.23668 76.7734 7.35141 77.3496 6.46615C77.4825 6.24484 77.6155 6.02352 77.7484 5.80221C78.0587 5.04973 77.7041 4.38579 76.9064 4.29726C75.8871 4.16447 74.8677 4.07594 73.8041 4.16447C73.4052 4.20873 73.0063 4.253 72.6518 4.253C71.6768 4.16447 71.0563 4.6071 70.6131 5.40384C70.3915 5.80221 70.1256 6.11205 69.8597 6.46615C69.4165 7.1301 68.8847 7.74978 68.3972 8.41373C68.1313 8.76783 67.8211 9.1662 67.5552 9.56457C67.0676 10.1843 66.5801 10.8039 66.0926 11.4236C65.8267 11.7777 65.5608 12.1318 65.2949 12.4859C65.2506 12.4417 65.2063 12.3974 65.2063 12.3531C65.2063 11.7335 65.1619 11.0695 65.4279 10.4498C65.5165 10.2728 65.5165 10.0957 65.5165 9.87441C65.5608 8.36947 65.5608 6.82026 65.5608 5.31531C65.5608 5.09399 65.4722 4.82842 65.4279 4.51857Z" fill="#F85D5D"/>' +
                    '<path d="M93.0657 5.71368C92.7998 5.49236 92.5339 5.31531 92.268 5.09399C91.5589 4.51857 90.7168 4.16447 89.8305 4.03168C87.3043 3.67757 84.8225 3.58905 82.2963 3.63331C81.5429 3.63331 80.7895 3.7661 80.1247 4.12021C79.8145 4.253 79.5485 4.47431 79.4156 4.78415C79.2383 5.13826 79.1054 5.49236 79.0167 5.84647C78.8838 6.59894 78.7508 7.39568 78.7065 8.14815C78.5735 9.38752 78.5735 10.5826 78.4849 11.822C78.4849 12.3531 78.4406 12.84 78.3963 13.3712C78.1303 15.8942 77.8201 18.4172 77.8201 20.9402C77.8201 24.6583 77.6428 28.4207 77.9531 32.183C77.9974 32.7142 78.086 33.2453 78.1747 33.7765C78.2633 34.3962 78.6622 34.7503 79.2826 34.9716C80.5236 35.4585 81.7645 35.3257 82.9611 35.0159C83.6259 34.8388 84.0247 34.4404 84.1134 33.7322C84.202 32.9355 84.2906 32.1388 84.335 31.342C84.3793 29.9699 84.335 28.5977 84.335 27.2698C84.335 26.7829 84.3793 26.296 84.3793 25.8091C84.4236 24.8796 84.4679 23.9058 84.5122 22.9763C84.5122 22.8435 84.5565 22.7107 84.5565 22.5337C84.7781 22.4894 84.9554 22.4894 85.1327 22.4451C85.7975 22.4451 86.5066 22.4451 87.1713 22.4009C88.1464 22.3566 89.1214 22.2681 90.0521 22.1353C91.6475 21.8697 92.7998 20.4976 93.0214 18.9041C93.11 18.0631 93.2873 17.2221 93.376 16.3368C93.5089 14.9647 93.6419 13.5483 93.6862 12.1761C93.7748 10.4941 93.6862 8.85636 93.5089 7.17436C93.4646 6.64321 93.376 6.15631 93.0657 5.71368ZM88.8111 11.999C88.7225 12.9286 88.6782 13.9024 88.5452 14.8319C88.4123 15.8499 87.9691 16.3368 86.9498 16.4696C86.3736 16.5581 85.7975 16.6024 85.2213 16.5581C84.5122 16.5139 84.1577 16.0712 84.2463 15.363C84.2906 14.6106 84.2906 13.9024 84.3793 13.1499C84.4236 12.4859 84.4679 11.822 84.5565 11.158C84.5565 10.8039 84.6009 10.4498 84.6452 10.0957C84.6895 9.60883 84.9554 9.29899 85.3986 9.34326C86.2407 9.38752 87.127 9.43178 88.0134 9.60883C88.6339 9.69736 88.7668 9.96294 88.7668 10.5826C88.7668 11.0253 88.7668 11.5121 88.7668 11.999H88.8111Z" fill="#F85D5D"/>' +
                    '<path d="M105.912 22.2238C105.912 22.1353 105.868 22.091 105.868 22.0025C105.823 21.8255 105.735 21.6484 105.868 21.5156C105.956 21.4271 106.045 21.4271 106.178 21.3828C106.621 21.3386 107.064 21.25 107.507 21.1172C108.482 20.7189 109.191 19.7894 109.502 18.8156C109.856 17.7975 109.901 16.7352 109.945 15.6729C110.034 14.1679 110.034 12.7073 110.122 11.2023C110.255 9.34326 110.743 6.82026 109.59 5.18252C108.793 4.07594 107.33 3.72184 106.001 3.67757C103.43 3.58905 100.904 3.67757 98.3334 3.67757C97.6686 3.63331 97.0482 3.81036 96.4277 4.12021C96.0732 4.29726 95.8073 4.6071 95.63 5.00547C95.2754 5.75794 95.1868 6.55468 95.1425 7.39568C95.0982 9.12194 95.0538 10.8482 94.9652 12.5745C94.9652 12.7073 94.9652 12.84 94.9652 13.0171C94.8766 14.8761 94.7879 16.7795 94.9652 18.6828C94.9652 19.0811 94.9652 19.4795 94.9209 19.8336C94.8323 20.8074 94.7436 21.7812 94.655 22.755C94.6106 23.4632 94.655 24.1714 94.6993 24.8796C94.6993 26.2075 94.7879 27.5354 94.7879 28.8633C94.7879 30.501 94.6993 32.0945 94.655 33.688C94.655 34.4847 94.8322 34.706 95.5413 35.0159C96.7823 35.5028 98.0232 35.37 99.2641 35.0601C99.9289 34.8831 100.283 34.4404 100.416 33.7322C100.727 31.9617 100.682 30.1469 100.594 28.3764C100.594 27.5797 100.727 26.7829 100.771 25.9862C101.436 27.1813 101.835 28.5535 102.411 29.7928C102.987 31.2092 103.607 32.5814 104.228 33.9536C104.405 34.3519 104.582 34.7503 104.937 35.0159C105.38 35.37 106.001 35.4142 106.532 35.4142C107.596 35.4585 109.413 35.5913 110.034 34.5732C110.477 33.865 110.078 32.8912 109.723 32.1388C108.216 28.9076 107.02 25.5878 105.912 22.2238ZM103.341 15.0089C102.455 15.0975 101.613 15.5401 100.727 15.4073C100.372 14.4335 100.461 11.1138 100.904 9.83015C101.303 9.56457 101.746 9.69736 102.189 9.74162C102.632 9.83015 103.076 9.96294 103.563 10.0515C103.918 10.0957 104.095 10.2728 104.095 10.6269C104.139 10.9367 104.139 11.2908 104.139 11.6007C104.139 12.2646 104.095 12.8843 104.095 13.504C104.051 14.1237 103.962 14.6548 103.341 15.0089Z" fill="#F85D5D"/>'+
                    '<path d="M127.008 13.504C127.008 13.3712 127.052 13.2384 127.052 13.1056C127.052 11.6449 127.052 10.14 127.096 8.67931C127.096 8.36947 127.096 8.10389 127.141 7.79405C127.229 7.30715 127.318 6.77599 127.141 6.2891C126.963 5.89073 126.786 5.4481 126.609 5.04973C126.343 4.38579 125.811 4.03168 125.102 3.94315C124.526 3.85463 123.905 3.7661 123.285 3.7661C121.069 3.7661 118.72 3.58905 116.548 4.07594C115.396 4.34152 114.244 4.82842 113.402 5.71368C111.186 7.9711 111.673 11.2466 111.54 14.0794C111.452 15.5844 111.319 17.0893 111.274 18.5942C111.23 20.6304 111.23 22.6222 111.274 24.614C111.319 26.5616 111.142 28.5535 111.585 30.4568C111.806 31.6076 112.117 32.8027 113.003 33.5994C113.756 34.2634 114.776 34.4847 115.795 34.6175C117.612 34.8831 119.429 34.9273 121.29 34.7503C122.886 34.6175 124.969 34.5732 126.298 33.5552C126.875 33.1126 127.185 32.5371 127.273 31.8289C127.362 30.9437 127.362 30.0584 127.362 29.1731C127.362 28.3321 127.273 27.5354 127.185 26.7387C127.185 26.4731 127.096 26.1632 126.919 25.8977C126.653 25.4993 126.298 25.1009 125.767 25.1452C124.526 25.1452 123.285 25.1452 122.088 25.455C121.689 25.5436 121.423 25.6763 121.335 25.8534C121.069 26.7387 121.335 27.5354 120.847 28.1993C120.36 28.1551 119.917 28.1551 119.473 28.1551C119.429 28.1551 119.34 28.1551 119.296 28.1551C118.454 28.0666 118.011 27.5797 117.967 26.7829C117.967 25.5878 117.967 24.3927 117.967 23.1976C117.967 23.1091 118.011 23.0206 118.055 22.932C118.41 22.8435 118.764 22.7992 119.119 22.755C119.651 22.755 120.183 22.755 120.759 22.7107C121.113 22.6665 121.512 22.6222 121.911 22.4894C122.443 22.3566 122.797 21.9582 122.886 21.3828C122.93 20.8959 122.975 20.409 122.975 19.9221C122.93 19.0811 122.797 18.2401 122.753 17.3991C122.753 16.4254 121.955 15.4958 120.714 15.5844C119.917 15.6286 119.119 15.6286 118.321 15.6729C118.1 15.6729 117.922 15.6729 117.701 15.6729C117.701 14.6106 117.701 13.5925 117.701 12.5745C117.745 12.2646 117.878 11.999 117.967 11.6892C118.942 11.2466 119.872 11.2466 120.847 11.3351C120.98 11.999 121.069 12.5745 121.158 13.1941C121.202 13.9024 121.512 14.3893 122.133 14.6991C123.019 14.6548 123.861 14.6548 124.703 14.6106C125.013 14.5663 125.323 14.3893 125.678 14.345C126.254 14.2565 126.653 13.9466 127.008 13.504Z" fill="#F85D5D"/>'+
                    '<path d="M138.388 14.9204C138.743 14.9647 139.097 15.0532 139.452 15.0532C140.515 15.1417 141.535 14.9647 142.598 14.8761C142.997 14.8319 143.396 14.6991 143.751 14.522C143.972 13.9466 144.017 13.4155 144.017 12.84C144.061 12.1318 144.105 11.3794 144.15 10.6711C144.15 10.5384 144.15 10.4498 144.15 10.317C144.15 9.25473 144.15 8.19241 144.15 7.1301C144.194 6.46615 144.15 5.80221 143.839 5.18252C143.529 4.51857 143.042 4.12021 142.377 4.03168C141.756 3.89889 141.136 3.7661 140.471 3.7661C137.901 3.81036 135.33 3.58905 132.715 3.7661C131.873 3.81036 131.076 3.94315 130.278 4.29726C129.968 4.47431 129.657 4.65136 129.524 5.00547C129.347 5.35957 129.17 5.66942 129.126 6.06778C128.86 7.4842 128.594 8.94489 128.771 10.4056C128.771 10.5384 128.771 10.7154 128.771 10.8482C128.594 12.4417 128.594 14.0351 128.904 15.6286C128.948 15.8942 128.993 16.1155 128.993 16.3811C128.904 16.9565 129.17 17.4434 129.569 17.8418C130.056 18.2844 130.544 18.7713 131.076 19.1697C131.918 19.8336 132.804 20.409 133.646 21.0287C134.089 21.3828 134.488 21.7369 134.887 22.1353C135.242 22.4894 135.596 22.8878 135.951 23.2419C136.482 23.773 136.97 24.2599 137.457 24.7026C137.457 24.9239 137.502 25.1009 137.502 25.2337C137.502 25.7206 137.502 26.2075 137.502 26.6944C137.457 27.4469 137.014 27.8895 136.305 28.0223C135.773 28.0666 135.197 28.0666 134.621 28.1108C134.488 27.8452 134.355 27.6239 134.355 27.3583C134.266 26.6059 134.222 25.8091 134.178 25.0567C134.178 24.3485 133.912 23.9944 133.247 23.773C132.538 23.4632 131.785 23.3747 130.987 23.4189C129.657 23.5075 128.549 24.437 128.372 25.7206C128.328 26.1632 128.283 26.6501 128.283 27.0928C128.283 28.9518 128.239 30.7666 128.416 32.6257C128.461 33.2896 128.815 33.7765 129.214 34.2191C129.347 34.3519 129.524 34.4404 129.702 34.4847C130.278 34.6175 130.898 34.6618 131.474 34.7503C131.918 34.7946 132.405 34.8388 132.893 34.8831C133.735 34.9273 134.621 35.0601 135.507 35.0601C136.172 35.1044 136.881 35.0159 137.59 34.9716C138.654 34.9273 139.718 34.9273 140.781 34.8831C141.579 34.8388 142.377 34.6175 143.042 34.1306C143.307 33.865 143.529 33.5994 143.573 33.2453C143.662 32.4929 143.795 31.7404 143.839 30.9879C143.884 29.3059 143.928 27.6239 143.884 25.8977C143.884 24.437 143.751 22.9763 143.396 21.5156C143.352 21.3386 143.263 21.1615 143.175 20.9845C142.465 20.1435 141.845 19.2582 140.914 18.6828C139.363 17.6647 137.945 16.5139 136.571 15.3188C135.862 14.6991 135.242 14.0351 134.621 13.3712C134.665 12.7073 134.665 12.0876 135.064 11.5121C135.995 11.1138 136.926 11.2023 137.901 11.2908C138.034 12.4859 137.856 13.681 138.388 14.9204Z" fill="#F85D5D"/>'+
                    '<path d="M155.224 14.9204C155.579 14.9647 155.933 15.0532 156.288 15.0532C157.351 15.1417 158.371 14.9647 159.434 14.8761C159.833 14.8319 160.232 14.6991 160.587 14.522C160.808 13.9466 160.852 13.4155 160.852 12.84C160.897 12.1318 160.941 11.3794 160.985 10.6711C160.985 10.5384 160.985 10.4498 160.985 10.317C160.985 9.25473 160.985 8.19241 160.985 7.1301C161.03 6.46615 160.985 5.80221 160.675 5.18252C160.365 4.51857 159.877 4.12021 159.213 4.03168C158.592 3.89889 157.972 3.7661 157.307 3.7661C154.737 3.81036 152.166 3.58905 149.551 3.7661C148.709 3.81036 147.911 3.94315 147.114 4.29726C146.803 4.47431 146.493 4.65136 146.36 5.00547C146.183 5.35957 146.006 5.66942 145.961 6.06778C145.696 7.4842 145.43 8.94489 145.607 10.4056C145.607 10.5384 145.607 10.7154 145.607 10.8482C145.43 12.4417 145.43 14.0351 145.74 15.6286C145.784 15.8942 145.828 16.1155 145.828 16.3811C145.74 16.9565 146.006 17.4434 146.405 17.8418C146.892 18.2844 147.38 18.7713 147.911 19.1697C148.753 19.8336 149.64 20.409 150.482 21.0287C150.925 21.3828 151.324 21.7369 151.723 22.1353C152.077 22.4894 152.432 22.8878 152.786 23.2419C153.318 23.773 153.806 24.2599 154.293 24.7026C154.293 24.9239 154.338 25.1009 154.338 25.2337C154.338 25.7206 154.338 26.2075 154.338 26.6944C154.293 27.4469 153.85 27.8895 153.141 28.0223C152.609 28.0666 152.033 28.0666 151.457 28.1108C151.324 27.8452 151.191 27.6239 151.191 27.3583C151.102 26.6059 151.058 25.8091 151.014 25.0567C151.014 24.3485 150.748 23.9944 150.083 23.773C149.374 23.4632 148.621 23.3747 147.823 23.4189C146.493 23.5075 145.385 24.437 145.208 25.7206C145.164 26.1632 145.119 26.6501 145.119 27.0928C145.119 28.9518 145.075 30.7666 145.252 32.6257C145.297 33.2896 145.651 33.7765 146.05 34.2191C146.183 34.3519 146.36 34.4404 146.538 34.4847C147.114 34.6175 147.734 34.6618 148.31 34.7503C148.753 34.7946 149.241 34.8388 149.729 34.8831C150.571 34.9273 151.457 35.0601 152.343 35.0601C153.008 35.1044 153.717 35.0159 154.426 34.9716C155.49 34.9273 156.554 34.9273 157.617 34.8831C158.415 34.8388 159.213 34.6175 159.877 34.1306C160.143 33.865 160.365 33.5994 160.409 33.2453C160.498 32.4929 160.631 31.7404 160.675 30.9879C160.72 29.3059 160.764 27.6239 160.72 25.8977C160.72 24.437 160.587 22.9763 160.232 21.5156C160.188 21.3386 160.099 21.1615 160.01 20.9845C159.301 20.1435 158.681 19.2582 157.75 18.6828C156.199 17.6647 154.781 16.5139 153.407 15.3188C152.698 14.6991 152.077 14.0351 151.457 13.3712C151.501 12.7073 151.501 12.0876 151.9 11.5121C152.831 11.1138 153.761 11.2023 154.737 11.2908C154.869 12.4859 154.692 13.681 155.224 14.9204Z" fill="#F85D5D"/>'+
                    '</svg></div> <div class="elementor-add-section-drag-title'
                )),
                e.text(f);
            }
        },
        onPreviewLoaded: function() {
            this.initLandingPressKitButton(),
                window.elementor.$previewContents.on("click.addLandingPressKitTemplate", ".add-mockpress-template", _.bind(this.showTemplatesModal, this)),
                (this.channels = {
                    templates: Backbone.Radio.channel("LANDINGPRESSKIT_EDITOR:templates"),
                    tabs: Backbone.Radio.channel("LANDINGPRESSKIT_EDITOR:tabs"),
                    layout: Backbone.Radio.channel("LANDINGPRESSKIT_EDITOR:layout")
                }),
                (this.tabs = f.tabs),
                (this.defaultTab = f.defaultTab);
        },
        initLandingPressKitButton: function() {
            window.elementor.$previewContents.on("click.addLandingPressKitTemplate", ".elementor-editor-section-settings .elementor-editor-element-add", function() {
                var c = a(this),
                    d = c.closest(".elementor-top-section"),
                    e = d.data("model-cid");
                window.elementor.hasOwnProperty("previewView") ?
                    window.elementor.previewView.collection.length &&
                    a.each(window.elementor.previewView.collection.models, function(a, c) {
                        e === c.cid && (b.atIndex = a);
                    }) :
                    window.elementor.hasOwnProperty("sections") &&
                    window.elementor.sections.currentView.collection.length &&
                    a.each(window.elementor.sections.currentView.collection.models, function(a, c) {
                        e === c.cid && (b.atIndex = a);
                    });
            });
        },
        getFilter: function(a) {
            return this.channels.templates.request("filter:" + a);
        },
        setFilter: function(a, b) {
            this.channels.templates.reply("filter:" + a, b), this.channels.templates.trigger("filter:change");
        },
        getTab: function() {
            return this.channels.tabs.request("filter:tabs");
        },
        setTab: function(a, b) {
            this.channels.tabs.reply("filter:tabs", a), b || this.channels.tabs.trigger("filter:change");
        },
        getTabs: function() {
            var a = [];
            return (
                _.each(this.tabs, function(b, c) {
                    a.push({
                        slug: c,
                        title: b.title
                    });
                }),
                a
            );
        },
        getPreview: function(a) {
            return this.channels.layout.request("preview");
        },
        setPreview: function(a, b) {
            this.channels.layout.reply("preview", a), b || this.channels.layout.trigger("preview:change");
        },
        getCategories: function() {
            var a = [];
            return (
                _.each(this.categories, function(a, b) {
                    tabs.push({
                        slug: b,
                        title: a
                    });
                }),
                a
            );
        },
        getKeywords: function() {
            var a = [];
            return (
                _.each(this.keywords, function(a, b) {
                    tabs.push({
                        slug: b,
                        title: a
                    });
                }),
                a
            );
        },
        showTemplatesModal: function() {
            this.getModal().show(), this.layout || ((this.layout = new c.LibraryLayoutView()), this.layout.showLoadingView()), this.setTab(this.defaultTab, !0), this.requestTemplates(this.defaultTab), this.setPreview("initial");
        },
        requestTemplates: function(b) {
            var d = this,
                e = d.tabs[b];
            e.data.templates ?
                d.layout.showTemplatesView(e.data.templates, e.data.categories, e.data.keywords) :
                a.ajax({
                    url: ajaxurl,
                    type: "get",
                    dataType: "json",
                    data: {
                        action: "landingpresskit_get_templates",
                        tab: b
                    },
                    success: function(a) {
                        var e = new c.LibraryCollection(a.data.templates);
                        (d.tabs[b].data = {
                            templates: e,
                            categories: a.data.categories,
                            keywords: a.data.keywords
                        }), d.layout.showTemplatesView(e, a.data.categories, a.data.keywords);
                    },
                });
        },
        closeModal: function() {
            this.getModal().hide();
        },
        getModal: function() {
            return this.modal || (this.modal = elementor.dialogsManager.createWidget("lightbox", {
                id: "mockpress-template-library-modal",
                className: "elementor-templates-modal",
                closeButton: !1
            })), this.modal;
        },
    }),
    a(window).on("elementor:init", b.init);
})(jQuery);