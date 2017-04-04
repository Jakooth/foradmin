<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/foradmin">
    <section id="comments">
        <h2>
            <admin:menuItem label="Преглеждана на коментарите." 
            				        title="Коментари" url="comments" />
        </h2>
        <form>
            <table role="listbox">
                <thead>
                    <tr>
                        <th>Автор</th>
                        <th>Коментар</th>
                        <th>Сигнали</th>
                        <th>
                            <!--comments.js-->
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <!--comments.js-->
                </tbody>
            </table>
        </form>
        <div role="toolbar">
            <button class="refresh" type="button"><!--icon--></button>
        </div>
    </section>
</jsp:root>
