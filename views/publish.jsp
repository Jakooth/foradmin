<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/foradmin">
    <section id="publish">
        <h2>
            <admin:menuItem label="Избери тагове и дата на публукуване." 
            				title="Публикуване на статия" 
                            url="publish" />
        </h2>
        <form>
            <admin:formItem id="publishTagsInput" label="Тагове" 
            				placeholder="gta-5, sam-houser, rockstar" type="text" />
            <admin:formItem id="publishSiteInput" label="Страница"
            				placeholder="forplay, forlife" type="hidden" />
            <admin:formItem id="publishUrlInput" label="Адрес"
            				placeholder="the-title-to-lower-case" type="hidden" />
            <admin:formItem id="publishDateInput" label="Дата на публикуване" 
            				type="date" layout="two-cols" />
            <admin:formItem id="publishTimeInput" label="Час на публикуване" 
            				type="time" layout="two-cols" />
            <admin:formItem id="publishPrioritySelect" label="Приоритет" type="select">
                <option value="">Без приоритет</option>
                <option value="cover">корица</option>
                <option value="video">видео</option>
                <option value="review">ревю</option>
                <option value="feature">мнение</option>
            </admin:formItem>
            <admin:formItem id="publishIssueInput" label="Брой" 
            				placeholder="Брой 1 - Презереждане" type="text" 
                            autocomplete="off" />
        </form>
        <div role="toolbar">
            <button class="publish" type="button">Публикувай</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>
