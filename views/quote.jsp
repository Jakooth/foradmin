<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/foradmin">
    <section id="quote">
        <h2>
            <admin:menuItem label="Избери герой, добави текст и създай таг." title="Цитат" url="quote" />
        </h2>
        <form>
            <admin:formItem id="quoteCharacterInput" label="Герой" 
            				placeholder="Joker, Minsk, Batman" type="text" 
                            autocomplete="off" />
            <admin:formItem id="quoteUrlInput" label="Адрес" 
            				placeholder="minsk-and-boo-run, joker-and-batman-dancing-with-the-devil, duke-nukem-time-to-kick-ass" type="text" />
        	<admin:formItem id="quoteSaysInput" label="Цитат" type="area" 
            				placeholder="" />
        	<h3>Скрити стойности</h3>
            <admin:formItem id="quoteSaveIdInput" label="Идентификатор на записа" type="hidden" value="" />
        </form>
        <div role="toolbar">
            <button class="save" type="button">Запази</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>
