<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/foradmin">
    <section id="band">
        <h2>
            <admin:menuItem label="Добави банда и създай таг." title="Банда" url="band" />
        </h2>
        <form>
            <div class="Main" role="group">
                <div class="file">
                    <label>
                        <span class="clip">Избери</span>
                        <input id="bandMainInput" type="file" />
                    </label>
                </div>
            </div>
            <admin:formItem id="bandEnNameInput" label="Банда" 
            				placeholder="Metallica, Body Count, Daft Punk" type="text" />
            <admin:formItem id="bandTagInput" label="Таг" 
            				placeholder="metallica, body-count, daft-punk" type="text" />
            <admin:formItem id="bandBgNameInput" label="Имe на български" 
            				placeholder="" type="text" />
            <admin:formItem id="bandRelatedInput" label="Членове" 
            				placeholder="james-hetfield, lars-ulrich, kirk-hammett, robert-trujillo" type="text" />
            <admin:formItem id="bandTypeSelect" label="Тип" type="hidden" value="music" />
            <h3>Скрити стойности</h3>
            <admin:formItem id="bandSaveIdInput" label="Идентификатор на записа" type="hidden" value="" />
        </form>
        <div role="toolbar">
            <button class="save" type="button">Запази</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>
