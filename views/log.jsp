<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core"
			xmlns:fmt="http://java.sun.com/jsp/jstl/fmt"
            xmlns:admin="urn:jsptagdir:/WEB-INF/tags/foradmin">
    <section id="log">
        <h2>
            <admin:menuItem label="Преглеждана на последните промени по съдържанието." 
            				title="Активност" url="log" />
        </h2>
        <form>
            <table role="listbox">
                <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Автор</th>
                        <th>Събитие</th>
                        <th>Име</th>
                        <th>Обект</th>
                        <th>
                            <!--log.js-->
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <!--log.js-->
                </tbody>
            </table>
        </form>
        <div role="toolbar">
            <button class="refresh" type="button"><!--icon--></button>
        </div>
    </section>
</jsp:root>
