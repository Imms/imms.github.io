/**
 * Created by GregRos on 28/05/2016.
 */
import 'jquery';
import 'yamljs';
import { TestSuites } from './chartEntry';
import { Articles} from './articleTreeBuilder';

import './apiLinker';
import './embedChart'
Articles.makeNavTree($(".js-central-nav-column"));



