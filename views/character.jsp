<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/foradmin">
    <section id="character">
        <h2>
            <admin:menuItem label="Добави герой и създай таг." title="Герой" url="character" />
        </h2>
        <form>
        	<div class="Main" role="group">
                <div class="file">
                    <label><span class="clip">Избери</span>
                        <input id="characterMainInput" type="file" />
                    </label>
                </div>
            </div>
            <admin:formItem id="characterNameInput" label="Герой" 
            				placeholder="Sonic, Master Chief, Duke Nukem, Батман, Фокс Мълдър, Рапунцел, Ринсуинд, Ходор" type="text" />
            <admin:formItem id="characterTagInput" label="Таг" 
            				placeholder="sonic, master-chief, duke-nukem, batman, fox-mulder, rapunzel, rincewind, hodor" type="text" />
        	<admin:formItem id="characterTagsInput" label="Свързани игри, комапнии или други" 
            				placeholder="halo, bungie" type="text" />
        	<admin:formItem id="characterTypeSelect" label="Тип" type="select"/>
        </form>
        <div role="toolbar">
            <button class="save" type="button">Запази</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>
