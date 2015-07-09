<?xml version="1.0"?>

<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/foradmin">
    <section id="search">
        <h2>
            <admin:menuItem label="Намери игра, филм, статия, каре, картинка и т.н." 
            				title="Търсене" url="search" />
        </h2>
        <form>
            <admin:formItem id="searchTagInput" label="Таг" 
            				placeholder="gta-5, sam-houser, rockstar" 
                            type="search" autocomplete="off" layout="two-cols" />
            <admin:formItem id="searchObjectSelect" label="Категория" 
            				type="select" layout="two-cols">
                <option value="">Всички</option>
            </admin:formItem>
            <h3 class="clip">Резултати</h3>
            <ul role="listbox">
                <li class="object" role="option" data-type="игра">
                    <label>
                        <span>Grand Theft Auto 5</span>
                        <input name="searchChoice" type="radio" />
                    </label>
                </li>
                <li class="review" role="option" data-type="ревю">
                    <label>
                        <span>Grand Theft Auto V – сатирично менгеме. Вече и
                        в 1080p!</span>
                        <input name="searchChoice" type="radio" />
                    </label>
                </li>
                <li class="aside" role="option" data-type="каре">
                    <label>
                        <span>Лосантосейшън - или 10 начина да плющим в Лос Сантос.</span>
                        <input name="searchChoice" type="radio" />
                    </label>
                </li>
                <li class="news" role="option" data-type="новина">
                    <label>
                        <span>Линдзи Лоън съди авторите на Grand Theft Auto V,
                        но в крайна сметка яде бахора, като дърта пача.</span>
                        <input name="searchChoice" type="radio" />
                    </label>
                </li>
                <li class="img" role="option" data-type="картинка">
                    <label>
                        <img src="../assets/articles/gta-5/gta-5-01.jpg" alt="Без коментар." />
                        <span class="clip">gta-5-01.jpg</span>
                        <input name="searchChoice" type="radio" />
                    </label>
                </li>
                <li class="img" role="option" data-type="картинка">
                    <label>
                        <img src="../assets/articles/gta-5/gta-5-02.jpg" alt="Без коментар." />
                        <span class="clip">gta-5-02.jpg</span>
                        <input name="searchChoice" type="radio" />
                    </label>
                </li>
                <li class="img" role="option" data-type="картинка">
                    <label>
                        <img src="../assets/articles/gta-5/gta-5-03.jpg" alt="Без коментар." />
                        <span class="clip">gta-5-03.jpg</span>
                        <input name="searchChoice" type="radio" />
                    </label>
                </li>
                <li class="img" role="option" data-type="картинка">
                    <label>
                        <img src="../assets/articles/gta-5/gta-5-04.jpg" alt="Без коментар." />
                        <span class="clip">gta-5-04.jpg</span>
                        <input name="searchChoice" type="radio" />
                    </label>
                </li>
                <li class="img" role="option" data-type="картинка">
                    <label>
                        <img src="../assets/articles/gta-5/gta-5-05.jpg" alt="Без коментар." />
                        <span class="clip">gta-5-05.jpg</span>
                        <input name="searchChoice" type="radio" />
                    </label>
                </li>
                <li class="img" role="option" data-type="картинка">
                    <label>
                        <img src="../assets/articles/gta-5/gta-5-06.jpg" alt="Без коментар." />
                        <span class="clip">gta-5-06.jpg</span>
                        <input name="searchChoice" type="radio" />
                    </label>
                </li>
                <li class="img" role="option" data-type="картинка">
                    <label>
                        <img src="../assets/articles/gta-5/gta-5-07.jpg" alt="Без коментар." />
                        <span class="clip">gta-5-07.jpg</span>
                        <input name="searchChoice" type="radio" />
                    </label>
                </li>
                <li class="img" role="option" data-type="картинка">
                    <label>
                        <img src="../assets/articles/gta-5/gta-5-11.jpg" alt="Без коментар." />
                        <span class="clip">gta-5-11.jpg</span>
                        <input name="searchChoice" type="radio" />
                    </label>
                </li>
                <li class="img" role="option" data-type="картинка">
                    <label>
                        <img src="../assets/articles/gta-5/gta-5-caret.png" alt="Без коментар." />
                        <span class="clip">gta-5-caret.png</span>
                        <input name="searchChoice" type="radio" />
                    </label>
                </li>
                <li class="img" role="option" data-type="картинка">
                    <label>
                        <img src="../assets/articles/gta-5/gta-5-10.jpg" alt="Без коментар." />
                        <span class="clip">gta-5-10.jpg</span>
                        <input name="searchChoice" type="radio" />
                    </label>
                </li>
            </ul>
        </form>
        <div role="toolbar">
            <button class="ok" type="button">Избери</button>
            <button class="cancel" type="button">Отмени</button>
        </div>
    </section>
</jsp:root>
