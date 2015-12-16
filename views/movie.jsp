<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/foradmin">
    <section id="movie">
        <h2>
            <admin:menuItem label="Добави информация за филма и създай таг." title="Филми" url="movie" />
        </h2>
        <form>
            <div class="Main" role="group">
                <div class="file">
                    <label>
                        <span class="clip">Избери</span>
                        <input id="movieMainInput" type="file" />
                    </label>
                </div>
                <div class="file">
                    <label>
                        <span class="clip">Избери</span>
                        <input id="moviePosterInput" type="file" />
                    </label>
                </div>
            </div>
            <admin:formItem id="movieBgNameInput" label="Филм" 
            				placeholder="Междузвездни Войни: Силата се Пробужда" type="text" />
            <admin:formItem id="movieEnNameInput" label="Име на латиница" 
            				placeholder="Star Wars: The Force Awakens" type="text" />
            <admin:formItem id="movieTagInput" label="Таг" 
            				placeholder="star-wars-episode-the-force-awakens" type="text" />
            <admin:formItem id="movieTypeSelect" label="Тип" type="hidden" value="movies" />
            <admin:formItem id="movieSerieInput" label="Поредица" 
            				placeholder="star-wars" type="text" 
                            autocomplete="off" url="serie" layout="one-col" />
            <admin:formItem id="movieStickersInput" label="Стикери" 
            				placeholder="Broadsword, Soccer ball, Female elf face" type="text" />
            <admin:formItem id="movieGenreGroup" label="Жанр" type="group">
                <!--AdminManager-->
            </admin:formItem>
            <admin:formItem id="movieCastInput" label="Кастинг" 
            				placeholder="Бен Афлек, Розамунд Пайк, Нийл Патрик Харис, Тайлър Пери, Кери Куун, Ким Дикенс" type="text"
                            url="person" layout="one-col" />
            <admin:formItem id="movieDirectorInput" label="Режисьор" 
            				placeholder="Дейвид Финчър" type="text" 
                            url="person" layout="one-col" />
            <admin:formItem id="movieWriterInput" label="Сценарист" 
            				placeholder="Джилиън Флин" type="text" 
                            url="person" layout="one-col" />
            <admin:formItem id="movieCameraInput" label="Оператор" 
            				placeholder="Джеф Кроненует" type="text" 
                            url="person" layout="one-col" />
            <admin:formItem id="movieMusicInput" label="Музика" 
            				placeholder="Трент Резнър, Атикъс Рос" type="text" 
                            url="person" layout="one-col" />
            <admin:formItem id="movieDateInput" label="Премиера за България" type="date" layout="two-cols" />
            <admin:formItem id="movieWorldDateInput" label="Световна премиера" type="date" layout="two-cols" />
            <admin:formItem id="movieTimeInput" label="Времетраене" 
            				placeholder="149" type="text" layout="two-cols" />
            <admin:formItem id="movieRelatedInput" label="Подобни" 
            				placeholder="turks-in-space, Пазители на Галктиката" 
                            type="text" autocomplete="off" />
        	<h3>Скрити стойности</h3>
            <admin:formItem id="movieTypeSelect" label="Тип" type="hidden" value="movies" />
            <admin:formItem id="movieSaveIdInput" label="Идентификатор на записа" type="hidden" value="" />
            <admin:formItem id="movieSaveRelatedInput" label="Свързани" type="hidden" value="" />
        </form>
        <div role="toolbar">
            <button class="save" type="button">Запази</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>
