<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/foradmin">
    <section id="article">
        <h2>
            <admin:menuItem label="Създай статия." title="Статия" url="article" />
        </h2>
        <form>
            <h3>Тема</h3>
            <admin:formItem id="articleTypeSelect" label="Раздел" type="select" layout="two-cols" />
            <admin:formItem id="articleSubtypeSelect" label="Тип" type="select" layout="two-cols" />
            <div id="articleAVRegion" role="region">
                <admin:formItem id="articleVideoTechSelect" label="Видео" type="select" layout="two-cols">
                    <option value="">Без видео</option>
                    <option value="youtube">youtube</option>
                    <option disabled="disabled" value="vimeo">vimeo</option>
                    <option value="html5">forplay</option>
                </admin:formItem>
                <admin:formItem id="articleAudioTechSelect" label="Aудио" type="select" layout="two-cols">
                    <option value="">Без аудио</option>
                    <option value="mixcloud">mixcloud</option>
                </admin:formItem>
                <admin:formItem id="articleVideoUrlInput" label="Видео Препратка" type="text" 
                                placeholder="https://www.youtube.com/watch?v=8fhA-plmtJ8" />
                <admin:formItem id="articleAudioFrameInput" label="Аудио Фрейм" type="area" 
            				placeholder="//www.mixcloud.com/widget/iframe/?feed=http%3A%2F%2Fwww.mixcloud.com%2FForPlay_bg%2Fforplay-podcast-vol22-102014-%25D0%25BF%25D0%25BE%25D0%25B4%25D0%25BA%25D0%25B0%25D1%2581%25D1%2582%25D1%258A%25D1%2582-%25D0%25BD%25D0%25B0-%25D0%25B7%25D0%25B0%25D0%25B2%25D1%2580%25D1%258A%25D1%2589%25D0%25B0%25D0%25BD%25D0%25B5%25D1%2582%25D0%25BE%2F&amp;embed_uuid=377b2f9e-d0eb-4657-9d22-516c6010501c&amp;replace=0&amp;light=1&amp;embed_type=widget_standard&amp;hide_tracklist=1" />
                <admin:formItem id="articleAudioUrlInput" label="Аудио Препратка" type="area" 
            				placeholder="http://www.mixcloud.com/ForPlay_bg/forplay-podcast-vol22-102014-%D0%BF%D0%BE%D0%B4%D0%BA%D0%B0%D1%81%D1%82%D1%8A%D1%82-%D0%BD%D0%B0-%D0%B7%D0%B0%D0%B2%D1%80%D1%8A%D1%89%D0%B0%D0%BD%D0%B5%D1%82%D0%BE/?utm_source=widget&amp;amp;utm_medium=web&amp;amp;utm_campaign=base_links&amp;amp;utm_term=resource_link" />
            </div>
            <admin:formItem id="articleTitleInput" label="Заглавие" 
            				placeholder="Grand Theft Auto V – сатирично менгеме. Вече и в 1080p!" type="text" />
            <admin:formItem id="articleSubtitleInput" label="Подзаглавие" 
            				placeholder="Песен за Сам и Дан Хаузър..." type="text" />
            <admin:formItem id="articleAuthorsInput" label="Автори" 
            				placeholder="Snake, doomy" type="text" />
            <admin:formItem id="articleTagsInput" label="Тагове" 
            				placeholder="gta-5, sam-houser, rockstar" type="text" 
                            url="fortag" layout="one-col" />
            <div id="articleReviewRegion" role="region">
                <admin:formItem id="articleHypeSelect" label="Оценка" type="select" layout="two-cols" />
                <admin:formItem id="articleVersionTestedSelect" label="Тествана версия" type="select" layout="two-cols" />
                <admin:formItem id="articleBetterInput" label="По-добра" type="text" layout="two-cols" />
                <admin:formItem id="articleBetterTextInput" label="По-добра текст" type="text" layout="two-cols" />
                <admin:formItem id="articleWorseInput" label="По-лоша" type="text" layout="two-cols" />
                <admin:formItem id="articleWorseTextInput" label="По-лоша текст" type="text" layout="two-cols" />
                <admin:formItem id="articleEqualInput" label="Равностойна" type="text" layout="two-cols" />
                <admin:formItem id="articleEqualTextInput" label="Равностойна текст" type="text" layout="two-cols" />
            </div>
            <h3>Корица</h3>
            <div class="Cover" role="region">
                <div class="h-preview">
                    <!--preview-->
                </div>
                <div class="v-preview">
                    <!--preview-->
                </div>
                <div class="file">
                	<img class="svg" src="../assets/forplay.svg" alt="Forplay&amp;reg;" />
                	<input aria-label="Избери" 
                    	   id="articleCoverInput" type="file" />
                </div>
            </div>
            <admin:formItem id="articleBgHSelect" label="Хоризонтално позициониране" type="select" layout="two-cols">
                <option value="left">Ляво</option>
                <option value="25%">25%</option>
                <option value="center">Среда</option>
                <option value="75%">75%</option>
                <option value="right">Дясно</option>
            </admin:formItem>
            <admin:formItem id="articleBgVSelect" label="Вертикално позициониране" type="select" layout="two-cols">
                <option value="top">Горе</option>
                <option value="center">Център</option>
                <option value="bottom">Долу</option>
            </admin:formItem>
            <admin:formItem id="articleThemeSelect" label="Тема" type="select" layout="two-cols">
                <option value="">Без тема</option>
            </admin:formItem>
            <admin:formItem id="articleSubthemeSelect" label="Подтема" type="select" layout="two-cols">
                <option value="">Без подтема</option>
            </admin:formItem>
            <h3>Основни картинки</h3>
            <div class="Main" role="group">
            	<div class="file">
                	<img class="svg" src="../assets/forplay.svg" alt="Forplay&amp;reg;" />
                	<input aria-label="Избери" 
                    	   id="articleWideInput" type="file" />
                </div>
                <div class="file">
                	<input aria-label="Избери" 
                    	   id="articleShotInput" type="file" />
                </div>
                <div class="file">
                	<input aria-label="Избери" 
                    	   id="articleCaretInput" type="file" />
                </div>
            </div>
            <h3>Съдържание</h3>
            <div class="Add Content" role="region">
                <button class="add" type="button">Добави съдържание</button>
            </div>
            <h3>Скрити стойности</h3>
            <admin:formItem id="articleSaveIdInput" label="Идентификатор на записа" type="hidden" value="" />
            <admin:formItem id="articleSaveShotInput" label="Картинка шот" type="hidden" value="" />
            <admin:formItem id="articleSaveWideInput" label="Картинка широка" type="hidden" value="" />
            <admin:formItem id="articleSaveCaretInput" label="Картинка каре" type="hidden" value="" />
            <admin:formItem id="articleSaveCoverInput" label="Корица" type="hidden" value="" />
            <admin:formItem id="articleSaveAuthorsInput" label="Автори" type="hidden" value="" />
            <admin:formItem id="articleSaveTagsInput" label="Тагове" type="hidden" value="" />
            <admin:formItem id="articleSaveLayoutsInput" label="Шаблони" type="hidden" value="" />
        </form>
        <div role="toolbar">
        	<button class="new" type="button">Нова</button>
            <button class="publish" type="button">Публикувай</button>
            <button class="save" type="button">Запази</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>
