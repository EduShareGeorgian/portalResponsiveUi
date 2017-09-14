<%-- SPG:

This HTML file has been associated with a SharePoint Page Layout (.aspx file) carrying the same name.  While the files remain associated, you will not be allowed to edit the .aspx file, and any rename, move, or deletion operations will be reciprocated.

To build the page layout directly from this HTML file, simply fill in the contents of content placeholders.  Use the Snippet Generator at https://georgiancollege.sharepoint.com/sites/student/_layouts/15/ComponentHome.aspx?Url=https%3A%2F%2Fgeorgiancollege%2Esharepoint%2Ecom%2Fsites%2Fstudent%2F%5Fcatalogs%2Fmasterpage%2FGC%20Portal%20Home%2Easpx to create and customize additional content placeholders and other useful SharePoint entities, then copy and paste them as HTML snippets into your HTML code.   All updates to this file within content placeholders will automatically sync to the associated page layout.

 --%>
<%@Page language="C#" Inherits="Microsoft.SharePoint.Publishing.PublishingLayoutPage, Microsoft.SharePoint.Publishing, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"%>
<%@Register TagPrefix="PageFieldFieldValue" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"%>
<%@Register TagPrefix="Publishing" Namespace="Microsoft.SharePoint.Publishing.WebControls" Assembly="Microsoft.SharePoint.Publishing, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"%>
<%@Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"%>
<asp:Content runat="server" ContentPlaceHolderID="PlaceHolderPageTitle">
            
            
            <PageFieldFieldValue:FieldValue FieldName="fa564e0f-0c70-4ab9-b863-0177e6ddd247" runat="server">
            </PageFieldFieldValue:FieldValue>
            
        </asp:Content><asp:Content runat="server" ContentPlaceHolderID="PlaceHolderAdditionalPageHead">
            
            
            
            <Publishing:EditModePanel runat="server" id="editmodestyles">
                <SharePoint:CssRegistration name="&lt;% $SPUrl:~sitecollection/Style Library/~language/Themable/Core Styles/editmode15.css %&gt;" After="&lt;% $SPUrl:~sitecollection/Style Library/~language/Themable/Core Styles/pagelayouts15.css %&gt;" runat="server">
                </SharePoint:CssRegistration>
            </Publishing:EditModePanel>
            
        </asp:Content><asp:Content runat="server" ContentPlaceHolderID="PlaceHolderFormDigest">
            <SharePoint:FormDigest runat="server" />
        </asp:Content><asp:Content runat="server" ContentPlaceHolderID="PlaceHolderTitleBreadcrumb">
            <SharePoint:ListSiteMapPath runat="server" SiteMapProviders="SPSiteMapProvider,SPContentMapProvider" RenderCurrentNodeAsLink="false" PathSeparator="" CssClass="ms-breadcrumb" NodeStyle-CssClass="ms-breadcrumbNode" CurrentNodeStyle-CssClass="ms-breadcrumbCurrentNode" RootNodeStyle-CssClass="ms-breadcrumbRootNode" NodeImageOffsetX="0" NodeImageOffsetY="289" NodeImageWidth="16" NodeImageHeight="16" NodeImageUrl="/_layouts/15/images/fgimg.png?rev=43" RTLNodeImageOffsetX="0" RTLNodeImageOffsetY="312" RTLNodeImageWidth="16" RTLNodeImageHeight="16" RTLNodeImageUrl="/_layouts/15/images/fgimg.png?rev=43" HideInteriorRootNodes="true" SkipLinkText="" />
        </asp:Content><asp:Content runat="server" ContentPlaceHolderID="PlaceHolderBodyAreaClass">
        </asp:Content><asp:Content runat="server" ContentPlaceHolderID="PlaceHolderTopNavBar">
            <SharePoint:AspMenu ID="TopNavigationMenu" Runat="server" EnableViewState="false" DataSourceID="topSiteMap" AccessKey="&lt;%$Resources:wss,navigation_accesskey%&gt;" UseSimpleRendering="true" UseSeparateCss="false" Orientation="Horizontal" StaticDisplayLevels="2" AdjustForShowStartingNode="true" MaximumDynamicDisplayLevels="2" SkipLinkText="" />
            
        </asp:Content><asp:Content runat="server" ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea">
            <SharePoint:SPTitleBreadcrumb runat="server" RenderCurrentNodeAsLink="true" SiteMapProvider="SPContentMapProvider" CentralAdminSiteMapProvider="SPXmlAdminContentMapProvider" SkipLinkText="">
            
            <PATHSEPARATORTEMPLATE>
            <SharePoint:ClusteredDirectionalSeparatorArrow runat="server" />
            </PATHSEPARATORTEMPLATE>
            </SharePoint:SPTitleBreadcrumb>
            
            
            <PageFieldFieldValue:FieldValue FieldName="fa564e0f-0c70-4ab9-b863-0177e6ddd247" runat="server">
            </PageFieldFieldValue:FieldValue>
            
        </asp:Content><asp:Content runat="server" ContentPlaceHolderID="PlaceHolderPageDescription">
        </asp:Content><asp:Content runat="server" ContentPlaceHolderID="PlaceHolderSearchArea">
            <div id="searchInputBox">
                <SharePoint:DelegateControl runat="server" ControlId="SmallSearchInputBox" />
                
            </div>
        </asp:Content><asp:Content runat="server" ContentPlaceHolderID="PlaceHolderLeftNavBar">
            <SharePoint:DelegateControl runat="server" ControlId="QuickLaunchTop" />
            <a id="startNavigation" name="startNavigation" tabIndex="-1">
            </a>
            <div>
            </div>
            <div>
            </div>
            <div>
            </div>
            <div>
            </div>
            <div>
            </div>
            <div class="ms-core-sideNavBox-removeLeftMargin">
                <SharePoint:SPNavigationManager id="QuickLaunchNavigationManager" runat="server" QuickLaunchControlId="V4QuickLaunchMenu" ContainedControl="QuickLaunch" EnableViewState="false">
                <SharePoint:DelegateControl runat="server" ControlId="QuickLaunchDataSource">
                <Template_Controls>
                <asp:SiteMapDataSource SiteMapProvider="SPNavigationProvider" ShowStartingNode="False" id="QuickLaunchSiteMap" StartingNodeUrl="sid:1025" runat="server" />
                </Template_Controls>
                </SharePoint:DelegateControl>
                <SharePoint:AspMenu id="V4QuickLaunchMenu" runat="server" EnableViewState="false" DataSourceId="QuickLaunchSiteMap" UseSimpleRendering="true" Orientation="Vertical" StaticDisplayLevels="3" AdjustForShowStartingNode="true" MaximumDynamicDisplayLevels="0" SkipLinkText="" />
                </SharePoint:SPNavigationManager>
                <SharePoint:SPNavigationManager id="TreeViewNavigationManagerV4" runat="server" ContainedControl="TreeView" CssClass="ms-tv-box">
                <SharePoint:SPLinkButton runat="server" NavigateUrl="~site/_layouts/15/viewlsts.aspx" id="idNavLinkSiteHierarchyV4" Text="&lt;%$Resources:wss,treeview_header%&gt;" accesskey="&lt;%$Resources:wss,quiklnch_allcontent_AK%&gt;" CssClass="ms-tv-header" />
                <SharePoint:DelegateControl runat="server" ControlId="TreeViewAndDataSource">
                <Template_Controls>
                <SharePoint:SPHierarchyDataSourceControl runat="server" id="TreeViewDataSourceV4" RootContextObject="Web" IncludeDiscussionFolders="true" />
                <SharePoint:SPRememberScroll runat="server" id="TreeViewRememberScrollV4" onscroll="javascript:_spRecordScrollPositions(this);" style="overflow: auto;">
                <SharePoint:SPTreeView id="WebTreeViewV4" runat="server" ShowLines="false" DataSourceId="TreeViewDataSourceV4" ExpandDepth="0" SelectedNodeStyle-CssClass="ms-tv-selected" NodeStyle-CssClass="ms-tv-item" SkipLinkText="" NodeIndent="12" ExpandImageUrl="/_layouts/15/images/tvclosed.png?rev=43" ExpandImageUrlRtl="/_layouts/15/images/tvclosedrtl.png?rev=43" CollapseImageUrl="/_layouts/15/images/tvopen.png?rev=43" CollapseImageUrlRtl="/_layouts/15/images/tvopenrtl.png?rev=43" NoExpandImageUrl="/_layouts/15/images/tvblank.gif?rev=43">
                </SharePoint:SPTreeView>
                </SharePoint:SPRememberScroll>
                </Template_Controls>
                </SharePoint:DelegateControl>
                </SharePoint:SPNavigationManager>
                <div>
                    <div class="ms-core-listMenu-verticalBox">
                        <SharePoint:ClusteredSPLinkButton runat="server" id="idNavLinkViewAll" PermissionsString="ViewFormPages" NavigateUrl="~site/_layouts/15/viewlsts.aspx" Text="&lt;%$Resources:wss,AllSiteContentMore%&gt;" ToolTip="&lt;%$Resources:wss,AllSiteContentMore%&gt;" accesskey="&lt;%$Resources:wss,quiklnch_allcontent_AK%&gt;" CssClass="ms-core-listMenu-item ms-core-listMenu-heading" />
                        
                    </div>
                </div>
            </div>
            <SharePoint:DelegateControl runat="server" ControlId="QuickLaunchBottom" />
        </asp:Content><asp:Content runat="server" ContentPlaceHolderID="PlaceHolderMain">
            <!-- Edit Mode Grid Begins -->
            <div class="ms-Grid" style="margin-left:0px">
                <!-- TopWeb Part Zone Begins-->
                <div class="ms-Grid-row">
                    <div class="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12 ms-u-xl12 ms-u-xxl12 ms-u-xxxl12">
                        <div id="WebPartZone0" data-name="WebPartZone">
                            
                            
                            <div>
                                <WebPartPages:WebPartZone runat="server" AllowPersonalization="false" ID="C48E14FF03414DA995699D20F7759E1F" FrameType="TitleBarOnly" Orientation="Vertical">
                                    <ZoneTemplate>
                                        
                                    </ZoneTemplate>
                                </WebPartPages:WebPartZone>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <!-- TopWeb Part Zone Ends-->
                <!-- Columns Web Part Zones Begin-->
                <div class="ms-Grid-row">
                    <div class="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg6 ms-u-xl4 ms-u-xxl6 ms-u-xxxl6">
                        <div class="ms-Grid">
                            <div class="ms-Grid-row">
                                <div class="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12 ms-u-xl12 ms-u-xxl6 ms-u-xxxl6" style="padding:16px;">
                                    <div id="WebPartZone1" data-name="WebPartZone" style="min-width:320px !important">
                                        
                                        
                                        <div>
                                            <WebPartPages:WebPartZone runat="server" AllowPersonalization="false" ID="xc25342fdeb194aa48f51be3f54d43e5c" FrameType="TitleBarOnly" Orientation="Vertical">
                                                <ZoneTemplate>
                                                    
                                                </ZoneTemplate>
                                            </WebPartPages:WebPartZone>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12 ms-u-xl12 ms-u-xxl6 ms-u-xxxl6" style="padding:16px;">
                                    <div id="WebPartZone2" data-name="WebPartZone" style="min-width:320px !important">
                                        
                                        
                                        <div>
                                            <WebPartPages:WebPartZone runat="server" AllowPersonalization="false" ID="x5fb10f2bbbb8443896c232dd4e6b50ce" FrameType="TitleBarOnly" Orientation="Vertical">
                                                <ZoneTemplate>
                                                    
                                                </ZoneTemplate>
                                            </WebPartPages:WebPartZone>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg6 ms-u-xl8 ms-u-xxl6 ms-u-xxxl6">
                        <div class="ms-Grid">
                            <div class="ms-Grid-row">
                                <div class="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12 ms-u-xl6 ms-u-xxl6 ms-u-xxxl6" style="padding:16px;">
                                    <div id="WebPartZone3" data-name="WebPartZone" style="min-width:320px !important;">
                                        
                                        
                                        <div>
                                            <WebPartPages:WebPartZone runat="server" AllowPersonalization="false" ID="x9bd041eca76645868572eef0d9532fc0" FrameType="TitleBarOnly" Orientation="Vertical">
                                                <ZoneTemplate>
                                                    
                                                </ZoneTemplate>
                                            </WebPartPages:WebPartZone>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12 ms-u-xl6 ms-u-xxl6 ms-u-xxxl6" style="padding:16px;">
                                    <div id="WebPartZone4" data-name="WebPartZone" style="min-width:320px !important;">
                                        
                                        
                                        <div>
                                            <WebPartPages:WebPartZone runat="server" AllowPersonalization="false" ID="x29587c9d635a4cd897889bc3231132a2" FrameType="TitleBarOnly" Orientation="Vertical">
                                                <ZoneTemplate>
                                                    
                                                </ZoneTemplate>
                                            </WebPartPages:WebPartZone>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Columns Web Part Zones End-->
                <!-- Bottom Web Part Zone Begins-->
                <div class="ms-Grid-row">
                    <div class="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12 ms-u-xl12 ms-u-xxl12 ms-u-xxxl12" style="padding:16px;">
                        <div id="WebPartZone5" data-name="WebPartZone" style="min-width:320px !important">
                            
                            
                            <div>
                                <WebPartPages:WebPartZone runat="server" AllowPersonalization="false" ID="F95CEADC85A04B838D3CDB80B84A0841" FrameType="TitleBarOnly" Orientation="Vertical">
                                    <ZoneTemplate>
                                        
                                    </ZoneTemplate>
                                </WebPartPages:WebPartZone>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <!-- Bottom Web Part Zone Ends-->
            </div>
            <!-- Edit Mode Grid Ends -->
        </asp:Content>