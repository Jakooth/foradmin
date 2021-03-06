<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/foradmin">
    <section id="quote">
        <h2>
            <admin:menuItem label="Избери раздел, таг и добави текст." title="Цитати и факти" url="quote" />
        </h2>
        <form>
            <admin:formItem id="quoteTypeSelect" label="Раздел" type="select" />
            <admin:formItem id="quoteTagsInput" label="Таг" 
            				placeholder="Minsk, Batman, Koralsky, doomy, SEGA, Steve Jobs" type="text" 
                            autocomplete="off" />
        	<admin:formItem id="quotePreviewInput" label="Цитат или факт" type="area" 
            				placeholder="" />
        	<h3>Скрити стойности</h3>
            <admin:formItem id="quoteSubtypeSelect" label="Подтип" type="hidden" value="quote" />
            <admin:formItem id="quoteSaveIdInput" label="Идентификатор на записа" type="hidden" value="" />
            <admin:formItem id="quoteSaveTagsInput" label="Тагове" type="hidden" value="" />
            <admin:formItem id="quoteUrlInput" label="Адрес" type="hidden" value="" />
        </form>
        <div role="toolbar">
        	<button class="new" type="button">Нов</button>
            <button class="save" type="button">Запази</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>
