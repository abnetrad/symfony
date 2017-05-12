function toggleHideClass(element, show)
{
    var classList = element.classList;

    if (show) {
        classList.remove('hide');
    } else if (!classList.contains('hide')) {
        classList.add('hide');
    }
}

function handleToggle(element, target, targets)
{
    // Init hide
    toggleHideClass(target, false);

    var onClick = function (element, targets)
    {
        var href = element.hasAttribute('data-href') ? element.getAttribute('data-href') : element.href;

        if (href && href.length > 0 && href !== '#') {
            toggleHideClass(target, false);

            var html;
            var that = element;

            $.ajax({
                url: href,
                success: function (response) {
                    html = response;
                    that.loaded = true;
                },
                async: false,
                dataType: 'HTML'
            });

            $(target).html(html);
        } else {
            // Hide all targets
            for (var i = 0; i < targets.length; i++) {
                toggleHideClass(targets[i], false);
            }
        }

        // Show target
        toggleHideClass(target, true);
        refreshMap(target);
    };

    element.addEventListener('click', function (event) {
        onClick(this, targets);
    });
}

function refreshMap(element)
{
    var el = element.querySelector('[id^="map_"]');
    if (el) {
        var id = el.getAttribute('id');
        var gmapObj = eval(id + '_container');

        if (gmapObj) {
            setTimeout(function () {
                google.maps.event.trigger(gmapObj.map, 'resize');

                if (Object.keys(gmapObj.markers).length == 1) {
                    var marker = gmapObj.markers[Object.keys(gmapObj.markers)[0]];
                    gmapObj.map.setCenter(marker.getPosition());
                }
            }, 500);
        }
    }
}

function elementReplaceClass(id, oldClass, newClass)
{
    var element = document.getElementById(id);
    var classList = element.classList;

    classList.remove(oldClass);
    classList.add(newClass);
}

$(function () {
    var elements = document.querySelectorAll('[role=toggle][data-target]');

    var targets = [];
    for (var i = 0; i < elements.length; i++) {
        var target = elements[i].getAttribute('data-target');
        if (target.charAt(0) == '.') {
            var nodes = document.querySelectorAll(target);
            for (var x = 0; x < nodes.length; x++) {
                targets.push(nodes.item(x));
            }
        } else {
            targets.push(document.getElementById(target));
        }
    }

    for (var i = 0; i < elements.length; i++) {
        handleToggle(elements[i], targets[i], targets);
    }
});
