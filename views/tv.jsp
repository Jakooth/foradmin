<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/foradmin">
    <section id="tv">
        <h2>
            <admin:menuItem label="Добави сериал и създай таг." 
            				title="Сериал" url="tv" />
        </h2>
        <form>
            <div class="Main" role="group">
                <div class="file">
                    <label>
                        <span class="clip">Избери</span>
                        <input id="tvMainInput" type="file" />
                    </label>
                </div>
                <div class="file">
                    <label>
                        <span class="clip">Избери</span>
                        <input id="tvPosterInput" type="file" data-subtype="poster" />
                    </label>
                </div>
            </div>
            <admin:formItem id="tvBgNameInput" label="Име на български" 
            				placeholder="Игра на Тронове" type="text" />
            <admin:formItem id="tvEnNameInput" label="Филм" 
            				placeholder="Game of Thrones" type="text" />
            <admin:formItem id="tvTagInput" label="Таг" 
            				placeholder="game-of-thrones" type="text" />
            <admin:formItem id="tvSiteInput" label="Сайт или Уикипедиа" 
            				placeholder="http://www.hbo.com/game-of-thrones" type="text" />
            <admin:formItem id="tvStickersInput" label="Стикери" 
            				placeholder="Broadsword, Soccer ball, Female elf face" type="text" />
            <admin:formItem id="tvGenreGroup" label="Жанр" type="group">
                <!--AdminManager-->
            </admin:formItem>
            <admin:formItem id="tvCastInput" label="Кастинг" 
            				placeholder="Стив Бушеми, Стивън Греъм, Майкъл Шанън, Майкъл Пит, Чарли Кокс" type="text"
                            url="person" layout="one-col" />
            <admin:formItem id="tvStarsInput" label="Именити автори, продуценти и режисьори" 
            				placeholder="Терънс Уинтър, Мартин Скорсезе, Марк Уолбърг, Тимъти Ван Патън" type="text" 
                            url="person" layout="one-col" />
            <admin:formItem id="tvCharactersInput" label="Най-култови образи" 
            				placeholder="Джип Розети" type="text" 
                            url="character" layout="one-col" />
            <admin:formItem id="tvAwardsInput" label="Престижни награди" type="area" 
            				placeholder="2 златни глобуса, 20 награди Emmy, над 170 номинации" />                
            <admin:formItem id="tvDateInput" label="Начло на излъчване" type="date" layout="two-cols" />
            <admin:formItem id="tvEndDateInput" label="Край на излъчване" type="date" layout="two-cols" />
            <admin:formItem id="tvSeasonsInput" label="Сезони" 
            				placeholder="5" type="text" layout="two-cols" />
            <admin:formItem id="tvRelatedInput" label="Подобни" 
            				placeholder="" 
                            type="text" autocomplete="off" />
        	<h3>Скрити стойности</h3>
            <admin:formItem id="tvTypeSelect" label="Тип" type="hidden" value="tv" />
            <admin:formItem id="tvSaveIdInput" label="Идентификатор на записа" type="hidden" value="" />
            <admin:formItem id="tvSaveRelatedInput" label="Свързани" type="hidden" value="" />
        </form>
        <div role="toolbar">
        	<button class="new" type="button">Нов</button>
            <button class="save" type="button">Запази</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>
