<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/foradmin">
    <div class="layout"
         data-id="{{:layout_id}}"
         data-type="{{:type}}"
         data-subtype="{{:subtype}}"
         data-ratio="{{:ratio}}"
         data-order="{{:order}}"
         data-saveimgs="{{:~saveImgs}}">
        <select aria-label="Тип оформление" class="header">
            <option value="text">Текст</option>
            <option value="img">Картинки</option>
            <option value="inside">Текст в картинка</option>
        </select>
        <img class="svg select-svg" 
             src="../assets/icons/iconmonstr/iconmonstr-menu-3-icon.svg" 
             alt="icon" 
             role="presentation" />
        <p class="select-subtitle">Избери тип оформление.</p>
        <div role="group">
            <div class="inline-col left-col" 
                 data-object="{{:left_object}}" 
                 data-url="{{:left}}"
                 data-valign="{{:left_valign}}">
                <button class="select" type="button">
                    <span class="clip">Добави игра, каре, цитат, статия или реклама</span>
                </button>
            </div>
            <div class="center-col textLayout" contenteditable="true">{{:center}}</div>
            <div class="center-col imgLayout">
                <select aria-label="Оформление на картинките" class="header">
                    <option value="z0">голяма</option>
                    <option value="z1">средна</option>
                    <option value="a1">2 малки + голяма</option>
                    <option value="a2">голяма + 2 малки</option>
                    <option value="a3">голяма + средна + малка</option>
                    <option disabled="disabled" value="b1">шахматно без застъпване</option>
                    <option value="b2">шахматно със застъпване</option>
                    <option value="f1">цял екран</option>
                    <option value="f3">цял екран + траклист</option>
                </select>
                <img class="svg select-svg" 
                     src="../assets/icons/iconmonstr/iconmonstr-menu-3-icon.svg" 
                     alt="icon" 
                     role="presentation" />
                <p class="select-subtitle">Избери позициониране на картинките.</p>
                <div class="sublayout z0Sublayout">
                	<admin:imgProxy pointer="Ляво" video="true" />
                </div>
                <div class="sublayout z1Sublayout">
                    <admin:imgProxy pointer="Ляво" video="true" />
                </div>
                <div class="sublayout a1Sublayout">
                	<admin:imgProxy pointer="Горе" ratio="true" video="true" />
                    <admin:imgProxy pointer="Дясно" ratio="true" video="true" />
                    <admin:imgProxy pointer="Ляво" ratio="true" video="true" tracklist="true" />
                </div>
                <div class="sublayout a2Sublayout">
                	<admin:imgProxy pointer="Ляво" ratio="true" video="true" tracklist="true" />
                    <admin:imgProxy pointer="Долу" ratio="true" video="true" />
                    <admin:imgProxy pointer="Дясно" ratio="true" video="true" />
                </div>
                <div class="sublayout a3Sublayout">
                   	<admin:imgProxy pointer="Ляво" ratio="true" video="true" tracklist="true" />
                    <admin:imgProxy pointer="Долу" ratio="true" video="true" />
                    <admin:imgProxy pointer="Горе" ratio="true" />
                </div>
                <div class="sublayout b1Sublayout">шахматно без застъпване</div>
                <div class="sublayout b2Sublayout">
                	<admin:imgProxy addremove="true" alt="false" />
                </div>
                <div class="sublayout f1Sublayout">
                	<admin:imgProxy video="true" alt="false" />
                </div>
                <div class="sublayout f3Sublayout">
                	<admin:imgProxy f3="true" alt="false" />
                </div>
            </div>
            <div class="center-col insideLayout">
                <select aria-label="Оформление на картинките" class="header">
                    <option value="i1">цял екран</option>
                    <option value="i4">2/3</option>
                    <option value="i2">2/3 прозрачна</option>
                    <option value="i3">2 малки + голяма</option>
                </select>
                <img class="svg select-svg" 
            	 src="../assets/icons/iconmonstr/iconmonstr-menu-3-icon.svg" 
                 alt="icon" 
                 role="presentation" />
                <p class="select-subtitle">Избери оформление на картинките.</p>
                <div class="sublayout i1Sublayout">
                	<admin:imgProxy settings="false" />
                </div>
                <div class="sublayout i2Sublayout">
                	<admin:imgProxy settings="false" />
                </div>
                <div class="sublayout i3Sublayout">
                	<admin:imgProxy pointer="Горе" video="true" />
                    <admin:imgProxy pointer="Дясно" video="true" />
                    <admin:imgProxy pointer="Ляво" video="true" />
                </div>
                <div class="sublayout i4Sublayout">
                    <admin:imgProxy settings="false" />
                </div>
                <div class="settings">
                    <select aria-label="Позициониране на текста">
                        <option value="bottom right">долу вдясно</option>
                        <option value="bottom center">долу център</option>
                        <option value="bottom left">долу вляво</option>
                        <option value="top right">горе вдясно</option>
                        <option value="top center">горе център</option>
                        <option value="top left">горе вляво</option>
                    </select>
                    <select aria-label="Автор">
                        <option value="">Без автор</option>
                    </select>
                </div>
                <div contenteditable="true" class="insideLayoutText">
                    <p>Натиснете тук, за да редактирате текста, използвайки само
                        параграфи,
                        <strong>болд</strong>
                        ,
                        <em>италик</em>
                        и
                        <a href="#" target="_blank">връзки</a>
                        . Този едитор поддържа и стандартни функции, като копи,
                        пейст, ънду и реду.</p>
                    <h3>Може да използвате и хединг 3</h3>
                    <p>За да редактирата съдържанието директно в HTML използвайте
                        бутона
                        <em>Source</em>
                        .</p>
                    <h3>Специален текст</h3>
                    <ol>
                        <li>Time to Relax</li>
                        <li>Nitro (Youth Energy)</li>
                        <li>Bad Habit</li>
                        <li>Gotta Get Away</li>
                    </ol>
                    <p>Бис:</p>
                    <ol>
                        <li>Intermission</li>
                        <li>All I Want</li>
                    </ol>
                </div>
            </div>
            <div class="inline-col right-col"
                 data-object="{{:right_object}}" 
                 data-url="{{:right}}"
                 data-valign="{{:right_valign}}">
                <button class="select" type="button">
                    <span class="clip">Добави каре, цитат, статия или реклама</span>
                </button>
            </div>
        </div>
        <button class="remove" type="button">
            <span class="clip">Изтрий</span>
        </button>
    </div>
</jsp:root>
