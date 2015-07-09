<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/foradmin">
    <section id="aside">
        <h2>
            <admin:menuItem label="Създай каре." title="Каре" url="aside" />
        </h2>
        <form>
            <h3>Тема</h3>
            <admin:formItem id="asideTypeSelect" label="Раздел" type="select" />
            <admin:formItem id="asideTitleInput" label="Заглавие" 
            				placeholder="Grand Theft Auto 5" type="text" />
            <admin:formItem id="asideSubtitleInput" label="Подзаглавие" 
            				placeholder="Grand Theft Auto 5" type="text" />
            <admin:formItem id="asideAuthorsInput" label="Автори" 
            				placeholder="Snake, doomy" type="text" />
            <h3>Основна картинка</h3>
            <div class="Main" role="group">
            	<div class="file">
                    <input aria-label="Избери" 
                    	   id="asideMainInput" type="file" />
                </div>
            </div>
            <h3>Съдържание</h3>
            <div class="Content" role="region">
                <div class="textLayout" id="textLayout_aside" contenteditable="true">
                    <p>Натиснете тук, за да редактирате текста, използвайки само
                        един параграф,
                        <strong>болд</strong>
                        ,
                        <em>италик</em>
                        и
                        <a href="#" target="_blank">връзки</a>
                        . Този едитор поддържа и стандартни функции, като копи,
                        пейст, ънду и реду. За да редактирата съдържанието директно
                        в HTML използвайте бутона
                        <em>Source</em>
                        .</p>
                </div>
            </div>
        </form>
        <div role="toolbar">
            <button class="publish" type="button">Публикувай</button>
            <button class="save" type="button">Запази</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>
