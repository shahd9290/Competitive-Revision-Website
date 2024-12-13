package danyal.fyp.awd.wrapper;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;

import java.util.*;

/**
 * A wrapper for {@link HttpServletRequest} to allow adding custom headers.
 * <p>
 * Sources:
 * <a href = https://bijubnair.blogspot.com/2008/12/adding-header-information-to-existing.html> Tech Flavors via blogspot.com</a>
 * <a href = https://wilddiary.com/adding-custom-headers-java-httpservletrequest/> Drona via wilddiary.com
 */
public class HttpRequestWrapper extends HttpServletRequestWrapper {

    private final Map<String, String> customHeaderMap;

    /**
     * Constructs a new {@code HttpRequestWrapper} with the specified request.
     *
     * @param request the original {@link HttpServletRequest}.
     */
    public HttpRequestWrapper(HttpServletRequest request) {
        super(request);
        customHeaderMap = new HashMap<String, String>();
    }

    /**
     * Adds a custom header to the request.
     *
     * @param name  the name of the header.
     * @param value the value of the header.
     */
    public void addHeader(String name, String value) {
        customHeaderMap.put(name, value);
    }

    /**
     * Retrieves the value of a header, checking custom headers first.
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
