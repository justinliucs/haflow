package haflow.test;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;

@ContextConfiguration(locations = "classpath:servlet-context.xml")
public class HdfsControllerTest extends AbstractJUnit4SpringContextTests {

}
