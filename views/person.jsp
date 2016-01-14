<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/foradmin">
    <section id="person">
        <h2>
            <admin:menuItem label="Добави персона и създай таг." title="Персона" url="person" />
        </h2>
        <form>
        	<div class="Main" role="group">
                <div class="file">
                    <label><span class="clip">Избери</span>
                        <input id="personMainInput" type="file" />
                    </label>
                </div>
            </div>
            <admin:formItem id="personBgNameInput" label="Персона" 
            				placeholder="Шигеру Миямото, Сам Хаузър, Чък Норис, Дейвид Финчър, Кърк Хамет, Айс-Ти, Фарел Уилямс, Тери Пратчет, Патрик Модиано" type="text" />
            <admin:formItem id="personEnNameInput" label="Име на латиница" 
            				placeholder="Shigeru Miyamoto, Chuck Norris, Ice-T" type="text" />
            <admin:formItem id="personTagInput" label="Таг" 
            				placeholder="shigeru-miyamoto, sam-houser, chuck-norris, david-fincher, kirk-hammett, ice-t, pharrell-williams, terry-pratchett, patrick-modiano" type="text" />
            <admin:formItem id="personRelatedInput" label="Свързани игри, комапнии или други" 
            				placeholder="gta-5, rockstar" type="text" />
            <admin:formItem id="personTypeSelect" label="Тип" type="select"/>
            <h3>Скрити стойности</h3>
            <admin:formItem id="personSaveIdInput" label="Идентификатор на записа" type="hidden" value="" />
            <admin:formItem id="personSaveRelatedInput" label="Свързани" type="hidden" value="" />
        </form>
        <div role="toolbar">
        	<button class="new" type="button">Нова</button>
            <button class="save" type="button">Запази</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>
