<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/foradmin">
    <section id="dlc">
        <h2>
            <admin:menuItem label="Добави dlc и създай таг." title="DLC" url="dlc" />
        </h2>
        <form>
            <div class="Main" role="group">
                <div class="file">
                    <label>
                        <span class="clip">Избери</span>
                        <input id="dlcMainInput" type="file" />
                    </label>
                </div>
            </div>
            <admin:formItem id="dlcEnNameInput" label="DLC" 
            				placeholder="Crown of the Ivory King" type="text" />
            <admin:formItem id="dlcTagInput" label="Таг" 
            				placeholder="crown-of-the-ivory-king" type="text" />
            <admin:formItem id="dlcBgNameInput" label="Имe на български" 
            				placeholder="Краун ъф дъ Ейвъри Кинг" type="text" />
            <admin:formItem id="dlcRelatedInput" label="Свързана игра" 
            				placeholder="dark-souls-2" type="text" />
            <h3>Скрити стойности</h3>
            <admin:formItem id="dlcTypeSelect" label="Тип" type="hidden" value="games" />
            <admin:formItem id="dlcSaveIdInput" label="Идентификатор на записа" type="hidden" value="" />
            <admin:formItem id="dlcSaveRelatedInput" label="Свързани" type="hidden" value="" />
        </form>
        <div role="toolbar">
            <button class="save" type="button">Запази</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>
