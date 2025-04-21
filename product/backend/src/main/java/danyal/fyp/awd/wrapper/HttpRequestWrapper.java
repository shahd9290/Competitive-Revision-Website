package danyal.fyp.awd.wrapper;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;

import java.util.*;

/**
 * A wrapper for {@link HttpServletRequest} to allow adding custom headers.
 * <p>
 * This class enables the modification of HTTP request headers by wrapping the original request and allowing the addition of custom headers.
 * It also ensures that custom headers are checked before the original request headers.
 * </p>
 * <p>
 * Sources:
 * <a href="https://bijubnair.blogspot.com/2008/12/adding-header-information-to-existing.html"> Tech Flavors via blogspot.com</a>
 * <a href="https://wilddiary.com/adding-custom-headers-java-httpservletrequest"> Drona via wilddiary.com </a>
 * </p>
 */
public class HttpRequestWrapper extends HttpServletRequestWrapper {

    private final Map<String, String> customHeaderMap;

    /**
     * Constructs a new {@code HttpRequestWrapper} with the specified request.
     * Initializes the custom header map to store custom headers.
     *
     * @param request the original {@link HttpServletRequest}.
     */
    public HttpRequestWrapper(HttpServletRequest request) {
        super(request);
        customHeaderMap = new HashMap<>();
    }

    /**
     * Adds a custom header to the request.
     * The custom header will take precedence over the original request header if they share the same name.
     *
     * @param name  the name of the header.
     * @param value the value of the header.
     */
    public void addHeader(String name, String value) {
        customHeaderMap.put(name, value);
    }

    /**
     * Retrieves the value of a header, checking custom headers first.
     * If the custom header exists, its value is returned; otherwise, the value from the original request is returned.
     *
     * @param name the name of the header.
     * @return the value of the header, or {@code null} if not found.
     */
    @Override
    public String getHeader(String name) {
        if (customHeaderMap.containsKey(name)) {
            return customHeaderMap.get(name);
        }
        return super.getHeader(name);
    }

    /**
     * Retrieves all values of a header, including custom and original request headers.
     * The custom headers are added first, followed by the values from the original request.
     *
     * @param name the name of the header.
     * @return an {@link Enumeration} of all header values.
     */
    @Override
    public Enumeration<String> getHeaders(String name) {
        List<String> values = new ArrayList<>();

        if (customHeaderMap.containsKey(name)) {
            values.add(customHeaderMap.get(name));
        }

        Enumeration<String> headers = super.getHeaders(name);
        while (headers.hasMoreElements()) {
            values.add(headers.nextElement());
        }

        return Collections.enumeration(values);
    }

    /**
     * Retrieves the value of a request parameter.
     * If the parameter exists in the custom header map, its value is returned instead of the original request parameter.
     *
     * @param name the name of the parameter.
     * @return the parameter value, or {@code null} if not found.
     */
    @Override
    public String getParameter(String name) {
        String paramValue = super.getParameter(name);
        if (paramValue != null) {
            paramValue = customHeaderMap.get(name);
        }
        return paramValue;
    }
}
